import { useState, useEffect } from "react";
import Icon from "./Icon";
import { FiUser, FiLogOut } from "react-icons/fi";
import { RiNotification4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { logout } from "@/hooks/auth";

const AccountDrawer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuthStore();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const closePopup = (e: any) => {
      if (showPopup && e.target.id !== "icon1" && e.target.id !== "icon2") {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", closePopup);
    return () => document.removeEventListener("click", closePopup);
  }, [showPopup]);

  const handleSignOut = async () => {
    logout();
  };

  return (
    <div className="h-16 flex items-center bg-white relative">
      {/* Avatar Image */}
      <div className="relative">
        <Icon
          id={"icon"}
          text={user?.name ? user.name : user?.email}
          image={user?.profilePicture ? user.profilePicture : null}
          click={togglePopup}
        />
        {showPopup && (
          <div className="absolute px-2 right-0 top-10 bg-white shadow-md rounded-lg  py-2 mt-4 min-w-[12rem] z-50">
            {user?.name && (
              <div>
                <h4 className="mx-2 font-bold text-sm">{user?.name}</h4>
                <p className="text-gray-800 text-sm mb-2 mx-2 font">
                  {user.email}
                </p>{" "}
              </div>
            )}
            {!user?.name && user?.email && (
              <div>
                <p className="text-gray-800 text-sm mb-2 mx-2 font-bold">
                  {user.email}
                </p>
              </div>
            )}
            <hr className="mb-2" />
            <Link
              to={`/user/${user?._id}`}
              className="flex items-center gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200"
            >
              <FiUser size={17} className=" text-parimary" />
              Profile
            </Link>
            <button className="flex items-center bg-white w-full gap-2 px-3 text-sm py-2 rounded-lg hover:bg-gray-200">
              <RiNotification4Line size={17} className=" text-primary" />
              Notifications
            </button>
            <div
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-gray-800 text-sm cursor-pointer rounded-lg hover:bg-gray-200"
            >
              <FiLogOut size={16} className=" text-parimary" />
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDrawer;
