import { User } from "@/types";
import { useEffect, useState } from "react";
import HeaderSection from "@/components/Profile/HeaderSection";
import SideBar from "@/components/Profile/SideBar";
import axios from "axios";
import { useParams } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setUser(null);
    handleGetUser();
  }, [id]);

  const handleGetUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/auth/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="px-32">
      {user && (
        <div className="flex">
          <SideBar />
          <HeaderSection
            //@ts-ignore
            userId={user._id}
            followers={user.followers}
            name={user.name}
            profilePicture={user.profilePicture}
            bio={user.bio}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
