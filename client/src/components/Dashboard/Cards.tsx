import { GiMissilePod } from "react-icons/gi";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";

const Cards = ({ totalPersonnel, totalMissiles, totalLaunches, totalBases }:{
    totalPersonnel: number,
    totalMissiles: number,
    totalLaunches: number,
    totalBases: number
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="card bg-white rounded-lg shadow-md p-4 hover:bg-violet-100 transition-all duration-200 flex flex-col items-center">
        <FaUserFriends className="text-violet-500 text-3xl mb-2" />
        <h2 className="font-semibold text-lg text-gray-700">Total Personnel</h2>
        <p className="text-xl font-bold text-gray-800">{totalPersonnel}</p>
      </div>
      <div className="card bg-white rounded-lg shadow-md p-4 hover:bg-violet-100 flex transition-all duration-200 flex-col items-center">
        <GiMissilePod className="text-violet-500 text-3xl mb-2" />
        <h2 className="font-semibold text-lg text-gray-700">Total Missiles</h2>
        <p className="text-xl font-bold text-gray-800">{totalMissiles}</p>
      </div>
      <div className="card bg-white rounded-lg shadow-md p-4 hover:bg-violet-100 flex transition-all duration-200 flex-col items-center">
        <MdFlightTakeoff className="text-violet-500 text-3xl mb-2" />
        <h2 className="font-semibold text-lg text-gray-700">Total Launches</h2>
        <p className="text-xl font-bold text-gray-800">{totalLaunches}</p>
      </div>
      <div className="card bg-white rounded-lg shadow-md p-4 hover:bg-violet-100 flex transition-all duration-200 flex-col items-center">
        <FaBuildingColumns className="text-violet-500 text-3xl mb-2" />
        <h2 className="font-semibold text-lg text-gray-700">Total Bases</h2>
        <p className="text-xl font-bold text-gray-800">{totalBases}</p>
      </div>
    </div>
  );
}

export default Cards;