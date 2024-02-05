import { User } from "@/types";
import { useEffect, useState } from "react";
import HeaderSection from "@/components/Profile/HeaderSection";
import ProfileNav from "@/components/Profile/ProfileNav";
import axios from "axios";
import { useParams } from "react-router-dom";
import LeftSideBar from "@/components/Feed/LeftSideBar.tsx";
import ProfilePosts from "@/components/Profile/Post";
import Education from "@/components/Profile/Education";
import WorkExperience from "@/components/Profile/WorkExperience";

const Profile = () => {
  const [active, setActive] = useState("posts");
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
    <div className="px-32 flex min-h-screen">
      <LeftSideBar />
      {user && (
        <div className="flex flex-col w-full">
          <HeaderSection
            //@ts-ignore
            userId={user._id}
            followers={user.followers}
            name={user.name}
            profilePicture={user.profilePicture}
            bio={user.bio}
          />
          <ProfileNav active={active} setActive={setActive} />
          {user && user._id && active === "posts" && (
            <ProfilePosts userId={user._id} />
          )}
          {user && user._id && active === "education" && (
            <Education userId={user._id} />
          )}
          {user && user._id && active === "workExperience" && (
            <WorkExperience userId={user._id} />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
