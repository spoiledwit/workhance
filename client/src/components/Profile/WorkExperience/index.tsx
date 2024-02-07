import useAuthStore from "@/store/authStore";
import AddWork from "./AddWork";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Experiences from "./Experiences";
import { User, WorkExperience } from "@/types";
import EditWorkExperience from "./EditWorkExperience";
import axios from "axios";
import { BiPlus } from "react-icons/bi";

const Work = ({ userId }: { userId: string }) => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<WorkExperience>()
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    handleGetUser();
  })


  function handleOpenModal(data: WorkExperience) {
    setEdit(true);
    setEditData(data);
  }

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

  return (
    <>
      {edit && (
        <EditWorkExperience
          open={edit}
          work={editData}
          setOpen={setEdit}
          userId={userId ? userId : ""}
        />
      )}
      <AddWork open={open} setOpen={setOpen} userId={userId} />
      {!profile?.workExperiences?.length && (
        <div className="flex flex-col items-center  mt-20 h-full w-full text-gray-500 text-2xl">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-4xl font-bold">No Work</h1>

            {user?._id === userId && (
              <Button onClick={() => setOpen(true)}>Add Work</Button>
            )}
          </div>
        </div>
      )
      }
      < div className="mt-1 ml-6 flex flex-col gap-3 xl:pr-0 lg:pr-0 md:pr-0 pr-4">
        {
          profile?.workExperiences?.length ?
            profile?.workExperiences.map((work: any) => (
              <>
                <Experiences data={work} userId={userId} setOpen={() => handleOpenModal(work)} />
              </>
            ))
            :
            null
        }
        {
          user?.educations?.length ?
            <>
              {/* // <div className="my-4 self-start p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-all"> */}
              {/* //   <BiPlus className="" onClick={() => setOpen(true)} /> */}
              {/* // </div> */}
              {/* // <div className="flex flex-row items-center border rounded border-gray-600 gap-2 w-fit px-2 py-1"> */}
              <Button className="w-fit gap-1 pr-5" onClick={() => setOpen(true)}>
                <BiPlus className="" size={20} />
                <p>Add Experience</p>
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

export default Work;