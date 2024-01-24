import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { GiMissilePod } from "react-icons/gi";
import { HiBuildingLibrary } from "react-icons/hi2";
import { logout } from "@/hooks/auth";
import { Button } from "../ui/button";

const SideBar = () => {
  const links = [
    {
      title: "Dashboard",
      slug: "/",
      icon: <MdSpaceDashboard />,
    },
    {
      title: "Military Personnel",
      slug: "/military-personnel",
      icon: <FaUserFriends />,
    },
    {
      title: "Bases",
      slug: "/bases",
      icon: <HiBuildingLibrary />,
    },
    {
      title: "Missile Pods",
      slug: "/missile-pods",
      icon: <GiMissilePod />,
    },
    {
      title: "Launches",
      slug: "/launches",
      icon: <MdOutlineRocketLaunch />,
    },
  ];

  const pathname = useLocation().pathname;

  return (
    <div className="h-screen border p-4 w-full flex flex-col">
      {links.map((link, index) => (
        <Link to={link.slug} className="block">
          <div
            key={index}
            className={`bg-white rounded-lg md:p-4 p-2 cursor-pointer hover:bg-gray-50 transition
          ${pathname === link.slug && "bg-gray-100"}
          `}
          >
            <div className="flex items-center space-x-4">
              <div className="text-violet-800 bg-violet-200 p-2 text-xl rounded-xl font-semibold">
                {link.icon}
              </div>
              <div className="text-violet-80 md:block hidden font-semibold">
                {link.title}
              </div>
            </div>
          </div>
        </Link>
      ))}
      <Button
        onClick={() => logout()}
        className="w-full bg-violet-800 hover:bg-violet-900 h-10 mt-auto mb-6 flex md:gap-2 items-center justify-center"
      >
        <p className="md:block hidden text-white font-semibold">Logout</p>
        <IoLogOut className="text-white text-xl" />
      </Button>
    </div>
  );
};

export default SideBar;
