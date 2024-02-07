import useAuthStore from "@/store/authStore";
import AddEducation from "./AddEducation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EducationInfo, User } from "@/types";
import Educations from "./Educations";
import EditEducation from "./EditEducation";
import axios from "axios";
import { BiPlus } from "react-icons/bi";

const Education = ({ userId }: { userId: string }) => {
  const { user } = useAuthStore();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<EducationInfo>()
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    handleGetUser();
  })

  const handleGetUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/auth/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  function handleOpenModal(data: EducationInfo) {
    setEdit(true);
    setEditData(data);
  }

  return (
    <>
      {edit && (
        <EditEducation
          open={edit}
          oldName={"hello"}
          oldBio={"ok"}
          education={editData}
          setOpen={setEdit}
          userId={userId ? userId : ""}
        />
      )}

      <AddEducation open={open} setOpen={setOpen} userId={userId} />
      {!profile?.educations?.length && (
        <div className="flex flex-col items-center  mt-20 h-full w-full text-gray-500 text-2xl">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-4xl font-bold">No Education</h1>
            {user?._id === userId && (
              <Button onClick={() => setOpen(true)}>Add Education</Button>
            )}
          </div>
        </div>
      )}

      {/* < div className="mt-1 ml-6 flex flex-row gap-2"> */}
      < div className="mt-1 ml-6 flex flex-col gap-3">
        <div>

          {
            profile?.educations?.length ?
              profile.educations.map((edu: EducationInfo) => (
                <>
                  <Educations data={edu} userId={userId} setOpen={handleOpenModal} />
                </>
              ))
              :
              null
          }
        </div>
        {
          user?.educations?.length ?
            <>
              {/* // <div className="my-4 self-start p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-all"> */}
              {/* //   <BiPlus className="" onClick={() => setOpen(true)} /> */}
              {/* // </div> */}
              {/* // <div className="flex flex-row items-center border rounded border-gray-600 gap-2 w-fit px-2 py-1"> */}
              <Button className="w-fit gap-1 pr-5" onClick={() => setOpen(true)}>
                <BiPlus className="" size={20} />
                <p>Add Education</p>
              </Button>

              {/* // </div> */}
            </>
            :
            null
        }
      </div >
    </>
  );
};

export default Education;
