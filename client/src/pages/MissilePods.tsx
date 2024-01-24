import axios from "axios";
import { useState, useEffect } from "react";
import { MissileType } from "@/types";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import MissileForm from "@/components/Missiles/MissileForm";
import MissileItem from "@/components/Missiles/MissileItem";

const Bases = () => {
  const [missiles, setMissiles] = useState<MissileType[]>([]);

  const [addNewMissile, setAddNewMissile] = useState(false);

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchMissile();
  }, []);

  const fetchMissile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/missile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMissiles(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-10">
      {loading ? (
        <p className="text-violet-950 text-lg font-medium">Loading...</p>
      ) : (
        <>
          <div className="flex w-full justify-between items-center">
            <h1 className="font-medium text-3xl text-violet-950 mb-1">
              {addNewMissile ? "Add Missile" : "Missiles"}
            </h1>
            <Button
              className="bg-violet-800 hover:bg-violet-900 text-white"
              onClick={() => setAddNewMissile(!addNewMissile)}
            >
              {addNewMissile ? "View Missile" : "Add Missile"}
            </Button>
          </div>
          <br />

          {addNewMissile ? (
            <>
              <MissileForm setMissiles={setMissiles} />
            </>
          ) : (
            <>
              {missiles.map((missile) => (
                <MissileItem missile={missile} setMissiles={setMissiles} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Bases;
