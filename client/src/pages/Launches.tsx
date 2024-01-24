import axios from "axios";
import { useState, useEffect } from "react";
import { LaunchType } from "@/types";
import { Button } from "@/components/ui/button";
import { getLaunches } from "@/hooks/launch";
import LaunchesItem from "@/components/Launches/LaunchesItem";

const Launches = () => {
  const [Launches, setLaunches] = useState<LaunchType[]>([]);

  const [addNewMissile, setAddNewMissile] = useState(false);

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      const res = await getLaunches();
      console.log(res);
      setLaunches(res);
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
              Launches
            </h1>
          </div>
          <br />

          <div className="flex flex-col gap-4">
            {Launches &&
              Launches.map((launch) => <LaunchesItem launch={launch} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default Launches;
