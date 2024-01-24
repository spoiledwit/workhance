import { useEffect, useState } from "react";
import { MissileType } from "@/types";
import Locator from "@/components/Locator/Locator";
import { Button } from "@/components/ui/button";
import { GiMissileLauncher } from "react-icons/gi";
import { calculateDistance } from "@/lib/utils";
import toast from "react-hot-toast";
import axios from "axios";

const Launch = () => {
  const [Location, setLocation] = useState<any>({});
  const [region, setRegion] = useState<string>("");
  const [bases, setBases] = useState<any[]>([]);
  const [selectedBase, setSelectedBase] = useState<any>({});
  const [selectedMissile, setSelectedMissile] = useState<MissileType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/base/withMissiles`
      );
      setBases(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (region) {
      getExpectedCasualties();
    }
  }, [region]);

  const getExpectedCasualties = async () => {
    try {
      const res = await axios.get('https://api.api-ninjas.com/v1/city?name=' + region, {
        headers: {
          'X-Api-Key': 'g6gCRjmNDW0Qp+hhjbHRew==dY7Cj9muIq6XgKTw'
        }
      })
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const LaunchMissile = async () => {
    const location = {
      lat1: selectedBase.location.latitude,
      lon1: selectedBase.location.longitude,
      lat2: Location.lat,
      lon2: Location.lng,
    };
    const distance = calculateDistance(location);
    if (!selectedMissile) {
      toast.error("No missile selected");
      return;
    }
    if (distance > selectedMissile?.range) {
      toast.error("Target location is out of range");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URI}/launch`,
        {
          missileId: selectedMissile?._id,
          baseId: selectedBase?._id,
          target:{
            latitude: Location.lat,
            longitude: Location.lng,
          },
          region: region,
          totalCost: (selectedMissile?.launchCost * distance) + selectedMissile?.purchaseCost.toFixed(0),
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Missile ${selectedMissile?.name} launched successfully`);
    } catch (error) {
      toast.error("Error launching missile");
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-medium">Select a base to launch from</h1>
      {loading && <h1>Loading...</h1>}
      {bases.map((base: any) => (
        <div
          onClick={() => setSelectedBase(base)}
          className={`p-3 border ${
            selectedBase === base
              ? "bg-gray-100 border-fuchsia-700 border-2"
              : ""
          } rounded-xl mt-4 w-fit flex flex-col cursor-pointer border-2`}
        >
          <h1>
            <span className=" font-medium text-fuchsia-800">{base.name}</span> -{" "}
            <span className="bg-fuchsia-800 text-white text-sm p-2 rounded-xl">
              {base.missiles.length} missile(s)
            </span>
          </h1>
          <h2 className="text-sm mt-3">
            <span className="font-medium">Region:</span> {base.region}
          </h2>
          <div className="flex flex-col text-sm">
            <span>
              <span className="font-medium">Latitude:</span>{" "}
              {base.location.latitude.toFixed(5)}
            </span>
            <span>
              <span className="font-medium">Longitude:</span>{" "}
              {base.location.longitude.toFixed(5)}
            </span>
          </div>
        </div>
      ))}
      {selectedBase._id && (
        <div>
          <h1 className="text-2xl font-medium mt-5">
            Select a missile to launch
          </h1>
          {selectedBase.missiles.length === 0 && (
            <div
              className={`p-3  rounded-xl mt-4 w-fit flex flex-col cursor-pointer border-2`}
            >
              No missiles available
            </div>
          )}
          <div className="flex gap-2 mb-4">
            {selectedBase.missiles.map((missile: any) => (
              <div
                onClick={() => setSelectedMissile(missile)}
                className={`p-3 border ${
                  selectedMissile === missile
                    ? "bg-gray-100 border-fuchsia-700 border-2"
                    : ""
                } rounded-xl mt-4 w-fit flex flex-col cursor-pointer border-2`}
              >
                {missile.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedMissile && (
        <div>
          <h1 className="text-2xl font-medium mt-5 mb-3">
            Select a target location
          </h1>
          <Locator
            region={region}
            selectRegion={setRegion}
            setLocation={setLocation}
            Location={Location}
            radius={selectedMissile.blastRadius}
          />
        </div>
      )}
      <Button
        onClick={() => {
          LaunchMissile();
        }}
        className="mt-5 h-12"
      >
        <GiMissileLauncher className="inline mr-2 text-2xl" />
        Launch Missile
      </Button>
    </div>
  );
};

export default Launch;
