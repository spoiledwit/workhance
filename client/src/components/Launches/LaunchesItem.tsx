import { LaunchType } from "@/types";

const LaunchesItem = ({ launch }: { launch: LaunchType }) => {
  return (
    <div className="flex flex-col p-5 rounded-lg bg-violet-950">
      <div className="flex justify-between items-center">
        <p className="text-white text-lg font-medium">{launch.targetName}</p>
        <p className="text-white text-lg font-medium">{launch.createdAt}</p>
      </div>
      <br />
      <div className="flex justify-between items-center">
        <p className="text-white text-lg font-medium">{launch.baseId.name}</p>
        <p className="text-white text-lg font-medium">
          {launch.missileId?.name}
        </p>
      </div>
    </div>
  );
};

export default LaunchesItem;
