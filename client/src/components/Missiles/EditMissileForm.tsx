import { MissileType } from "@/types";
import { useState } from "react";
import { updateMissile } from "@/hooks/missile";
import { Button } from "@/components/ui/button";

const EditMissileForm = ({
  oldMissile,
  setMissiles,
  setEnableEdit,
}: {
  oldMissile: MissileType;
  setMissiles?: any;
  setEnableEdit?: any;
}) => {
  const [missile, setMissile] = useState<MissileType>(oldMissile);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateMissile(missile._id, missile);
      console.log(res);
      setMissiles((prev: any) =>
        prev.map((missile: any) => (missile._id === res._id ? res : missile))
      );
      setEnableEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full h-full p-2 space-y-2 rounded-md">
      <form
        className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-md"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full p-2 border border-purple-700 rounded-md focus:outline-none"
          type="text"
          placeholder="Name"
          value={missile.name}
          onChange={(e) => setMissile({ ...missile, name: e.target.value })}
        />
        <input
          className="w-full p-2 border border-purple-700 rounded-md focus:outline-none"
          type="number"
          placeholder="Launch Cost"
          value={missile.launchCost}
          onChange={(e) =>
            setMissile({
              ...missile,
              launchCost: parseInt(e.target.value),
            })
          }
        />
        <input
          className="w-full p-2 border border-purple-700 rounded-md focus:outline-none"
          type="number"
          placeholder="Purchase Cost"
          value={missile.purchaseCost}
          onChange={(e) =>
            setMissile({
              ...missile,
              purchaseCost: parseInt(e.target.value),
            })
          }
        />
        <input
          className="w-full p-2 border border-purple-700 rounded-md focus:outline-none"
          type="number"
          placeholder="Range"
          value={missile.range}
          onChange={(e) =>
            setMissile({
              ...missile,
              range: parseInt(e.target.value),
            })
          }
        />
        <input
          className="w-full p-2 border border-purple-700 rounded-md focus:outline-none"
          type="number"
          placeholder="Blast Radius"
          value={missile.blastRadius}
          onChange={(e) =>
            setMissile({
              ...missile,
              blastRadius: parseInt(e.target.value),
            })
          }
        />
        <div className="flex w-full gap-4">
          <Button
            onClick={() => setEnableEdit(false)}
            className="w-full p-2 border bg-red-500 hover:bg-red-600 border-red-700 rounded-md"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full p-2 border bg-purple-700 hover:bg-purple-800 border-purple-700 rounded-md"
            disabled={loading}
          >
            Update Missile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMissileForm;
