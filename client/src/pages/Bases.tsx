import axios from "axios";
import { useState, useEffect } from "react";
import { BaseType } from "@/types";
import AddBaseForm from "@/components/Locator";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { addBase } from "@/hooks/base";
import BaseItem from "@/components/Base/baseItem";
import BasesMap from "@/components/Base/BasesMap";

const Bases = () => {
  const [bases, setbases] = useState<BaseType[]>([]);
  const [baseName, setBaseName] = useState("");
  const [addNewBase, setAddNewBase] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [region, setRegion] = useState("");
  const [Location, setLocation] = useState({ lat: 0, lng: 0 });
  const [missiles, setMissiles] = useState<string[]>([]);

  useEffect(() => {
    fetchbases();
  }, []);

  const fetchbases = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/base`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setbases(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
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
    setLoading(true);
    await addBase(baseData);
    setLoading(false);
  };

  return (
    <div className="flex flex-col p-10">
      {!addNewBase && (
        <BasesMap bases={bases} />
      )}
      
      {loading ? (
        <p className="text-violet-950 text-lg font-medium">Loading...</p>
      ) : (
        <>
          <div className="flex w-full justify-between items-center mt-6">
            <h1 className="font-medium text-3xl text-violet-950 mb-1">Bases</h1>
            <Button
              className="bg-violet-800 hover:bg-violet-900 text-white"
              onClick={() => setAddNewBase(!addNewBase)}
            >
              {addNewBase ? "View Bases" : "Add Base"}
            </Button>
          </div>
          <br />

          {addNewBase ? (
            <>
              <AddBaseForm
                handleSubmit={handleSubmit}
                baseName={baseName}
                setBaseName={setBaseName}
                region={region}
                Location={Location}
                setLocation={setLocation}
                setRegion={setRegion}
                loading={updating}
                setLoading={setUpdating}
                missiles={missiles}
                setMissiles={setMissiles}
              />
            </>
          ) : (
            <>
              {bases.map((base) => (
                <BaseItem key={base._id} base={base} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Bases;
