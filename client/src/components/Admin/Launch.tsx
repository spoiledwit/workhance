import { FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const Launch = () => {
  return (
    <Link 
    to={"/launch"}
    className="flex items-center justify-center bg-violet-800 hover:bg-violet-900 px-4 py-2 rounded-xl">
      <FaRocket className="text-5xl text-white p-2" />
      <p className=" text-white text-xl">Lanch</p>
    </Link>
  );
};

export default Launch;
