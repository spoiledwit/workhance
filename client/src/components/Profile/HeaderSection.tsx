import { Button } from "../ui/button";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import EditProfile from "./EditProfile";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import VerificationRequest from "./Verification/VerificationRequest";
import { BiCheck, BiTimeFive } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import VerifiedStatus from "./Verification/VerifiedStatus";

interface Props {
  name: string;
  bio?: string;
  profilePicture?: string;
  userId: string;
  verificationStatus?: string;
  followers: string[];
}

const HeaderSection = ({
  name,
  bio,
  profilePicture,
  userId,
  followers,
  verificationStatus
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const [edit, setEdit] = useState(false);
  const [verify, setVerify] = useState(false);
  const { toast } = useToast();

  const handleFollow = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URI}/auth/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URI}/auth/unfollow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 w-full justify-between border flex p-10 xl:max-h-[230px]">
      {edit && (
        <EditProfile
          open={edit}
          oldName={name}
          oldBio={bio}
          profilePicture={profilePicture}
          setOpen={setEdit}
          userId={userId ? userId : ""}
        />
      )}
      {verify && (
        <VerificationRequest
          open={verify}
          setOpen={setVerify}
          userId={userId ? userId : ""}
        />
      )}
      <span className="">
        <span className="flex items-center gap-6">
          <h2 className="text-xl lg:text-3xl md:text-3xl xl:text-3xl font-bold ">{name}</h2>
          {!(userId === user?._id) ? (
            <>
              {followers.includes(user?._id!) ? (
                <Button disabled={loading} onClick={handleUnfollow}>
                  Unfollow
                </Button>
              ) : (
                <Button disabled={loading} onClick={handleFollow}>
                  Follow
                </Button>
              )}
            </>
          ) : (
            <div
              className="hover:bg-gray-200 cursor-pointer ml-[-10px] p-2 rounded-full transition-all"
              onClick={() => setEdit(true)}
            >
              <MdOutlineEdit className="text-xl" />
            </div>
          )}
        </span>
        <p className="mt-2 text-md xl:text-lg">{bio ? bio : "No bio yet"}</p>
        <div className="mt-2">
          <span className="text-gray-500">{followers.length} followers</span>
        </div>
        {
          user?.educations?.length != 0 || user.workExperiences?.length != 0
            ?
            <VerifiedStatus verificationStatus={user?.verificationStatus} userId={userId} setVerify={setVerify} />
            :
            <div className="flex flex-row items-center gap-1 rounded border w-fit px-2 mt-2  transition-all text-gray-600 border-gray-500" title="Add experience or education to request verification" onClick={() => setVerify(true)}>
              Unable to verify
            </div>
        }
        {/* <div className="rounded border w-fit px-2 py-1 mt-2 hover:text-white hover:bg-[#2d2d2d] hover:border-[#2d2d2d] cursor-pointer transition-all text-gray-600 border-gray-500" onClick={() => setVerify(true)}>
          {verificationStatus ? verificationStatus !== "Pending" ? verificationStatus : "Verification Pending" : "Not Verified"}
        </div> */}
      </span>
      <span className="flex min-w-[100px] xl:min-w-[200px] items-center justify-center">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="profile"
            className="rounded-full w-20 h-20 xl:h-40 xl:w-40 object-cover"
          />
        ) : (
          <FaUserCircle size={140} className=" text-gray-500" />
        )}
      </span>
    </div>
  );
};

export default HeaderSection;
