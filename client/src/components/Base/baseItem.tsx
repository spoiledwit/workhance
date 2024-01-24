import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { deleteBase } from "@/hooks/base";
import { updateBase } from "@/hooks/base";
import { toast } from "react-hot-toast";
import { useState } from "react";
import AddBaseForm from "../Locator";
import { MdEdit } from "react-icons/md";
import { Button } from "../ui/button";
import SavePDF from "./SavePDF";

interface BaseType {
  _id?: string;
  name: string;
  location: {
    longitude: number;
    latitude: number;
  };
  region: string;
  missiles?: string[];
}

const BaseItem: React.FC<{ base: BaseType }> = ({ base }) => {
  const [baseName, setBaseName] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);

  const [updating, setUpdating] = useState(false);
  const [region, setRegion] = useState("");
  const [Location, setLocation] = useState({ lat: 0, lng: 0 });
  const [missiles, setMissiles] = useState<string[]>([]);

  useEffect(() => {
    setBaseName(base.name);
    setRegion(base.region);
    setLocation({
      lat: base.location.latitude,
      lng: base.location.longitude,
    });
    setMissiles(base.missiles || []);
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const baseData = {
      name: baseName,
      location: {
        latitude: Location.lat,
        longitude: Location.lng,
      },
      region: region,
      missiles: missiles,
    };

    if (!baseName) {
      toast.error("Base name is required");
      return;
    }

    if (!Location) {
      toast.error("Location is required");
      return;
    }

    if (!region) {
      toast.error("Region is required");
      return;
    }
    setUpdating(true);
    if (!base?._id) {
      toast.error("Base ID is required");
      setUpdating(false);
      return;
    }
    await updateBase(base?._id, baseData);
    setUpdating(false);
  };

  const copyValues = () => {
    setBaseName(base.name);
    setRegion(base.region);
    setLocation({
      lat: base.location.latitude,
      lng: base.location.longitude,
    });
  };

  return (
    <>
      {enableEdit ? (
        <>
          <AddBaseForm
            setRegion={setRegion}
            region={region}
            Location={Location}
            setBaseName={setBaseName}
            baseName={baseName}
            setLoading={setUpdating}
            setLocation={setLocation}
            handleSubmit={handleUpdate}
            loading={updating}
            missiles={missiles}
            setMissiles={setMissiles}
            text="Update Base"
          />
          <Button
            onClick={() => {
              copyValues();
              setEnableEdit(false);
            }}
          >
            Cancel Edit
          </Button>
        </>
      ) : (
        <>
          <div className="border rounded-lg shadow-md bg-white p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{baseName}</h3>
              <div className="flex justify-between items-center gap-2">
                <MdEdit
                  onClick={() => setEnableEdit(true)}
                  className="text-white bg-violet-800 p-1 rounded text-3xl cursor-pointer"
                />
                <MdDelete
                  //@ts-ignore
                  onClick={() => deleteBase(base._id)}
                  className="text-white bg-violet-800 p-1 rounded text-3xl cursor-pointer"
                />
                <SavePDF base={base} />
              </div>
            </div>
            <p className="text-gray-600">Region: {region}</p>
            <p className="text-gray-600">
              Location: {Location.lat}, {Location.lng}
            </p>
            {base.missiles && base.missiles.length > 0 && (
              <div>
                <h4 className="font-semibold mt-2">Missiles Ids:</h4>
                <ul className="list-disc pl-5">
                  {base.missiles.map((missile, index) => (
                    <li key={index} className="text-gray-600">
                      {missile}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BaseItem;
