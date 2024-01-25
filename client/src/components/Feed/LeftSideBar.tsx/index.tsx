import { MdOutlineMessage } from "react-icons/md";
import { BiBriefcase } from "react-icons/bi";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  const links = [
    {
      name: "Inbox",
      icon: <MdOutlineMessage />,
      path: "/inbox",
    },
    {
      name: "My Jobs",
      icon: <BiBriefcase />,
      path: "/jobs",
    },
  ];

  return (
    <div className="border rounded w-1/3 max-h-[550px] p-4">
      {links.map((link) => (
        <Link 
        to={link.path}
        key={link.name} className="flex hover:bg-gray-100 px-3 py-1 rounded-md items-center justify-between mb-2">
          <span className="flex items-center gap-2">
            {link.icon}
            <h3 className="font-semibold">{link.name}</h3>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default LeftSideBar;
