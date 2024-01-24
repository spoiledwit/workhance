import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteMissile, updateMissile } from "@/hooks/missile";
import { MissileType } from "@/types";
import { GiMissileLauncher } from "react-icons/gi";
import EditMissileForm from "./EditMissileForm";

interface MissileProps {
  missile: MissileType;
  setMissiles?: any;
}

const MissileItem: React.FC<MissileProps> = ({ missile, setMissiles }) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteMissile(id);
      setMissiles((prev: any) =>
        prev.filter((missile: any) => missile._id !== id)
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     setMissileName(missile.name);
  //   }, []);

  //   const handleUpdate = async (e: any) => {
  //     e.preventDefault();
  //     const missileData = {
  //       name: missileName,
  //     };
  //     if (!missileName) {
  //       toast.error("Missile name is required");
  //       return;
  //     }
  //     setUpdating(true);
  //     if (!missile?._id) {
  //       toast.error("Missile ID is required");
  //       setUpdating(false);
  //       return;
  //     }
  //     const updatedMissil = await updateMissile(missile?._id, missileData);
  //     setUpdating(false);
  //   };

  //   const copyValues = () => {
  //     setMissileName(missile.name);
  //   };

  return (
    <>
      {enableEdit ? (
        <EditMissileForm oldMissile={missile} setMissiles={setMissiles} setEnableEdit={setEnableEdit} />
      ) : (
        <div className="border rounded-lg shadow-md bg-white p-4 mb-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">
                <GiMissileLauncher className="inline-block mr-2 my-2" />
                {missile.name}
              </h3>
              <p className="text-sm text-gray-600">
                Launch Cost: {missile.launchCost}
              </p>
              <p className="text-sm text-gray-600">
                Purchase Cost: {missile.purchaseCost}
              </p>
              <p className="text-sm text-gray-600">Range: {missile.range}</p>
              <p className="text-sm text-gray-600">
                Blast Radius: {missile.blastRadius}
              </p>
            </div>

            <div className="flex justify-between items-start gap-2">
              <MdEdit
                onClick={() => setEnableEdit(true)}
                className="text-white bg-violet-800 p-1 rounded text-3xl cursor-pointer"
              />
              <MdDelete
                //@ts-ignore
                onClick={() => handleDelete(missile._id)}
                className="text-white bg-violet-800 p-1 rounded text-3xl cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MissileItem;
