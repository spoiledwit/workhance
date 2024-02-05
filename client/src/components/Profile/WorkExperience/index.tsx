import useAuthStore from "@/store/authStore";
import AddWork from "./AddWork";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Experiences from "./Experiences";
import { WorkExperience } from "@/types";
import EditWorkExperience from "./EditWorkExperience";

const Work = ({ userId }: { userId: string }) => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<WorkExperience>()

  function handleOpenModal(data: WorkExperience) {
    setEdit(true);
    setEditData(data);
  }

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
      {!user?.workExperiences?.length && (
        <div className="flex flex-col items-center  mt-20 h-full w-full text-gray-500 text-2xl">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-4xl font-bold">No Work</h1>
            {user?._id === userId && (
              <AddWork open={open} setOpen={setOpen} userId={userId} />
            )}
            {user?._id === userId && (
              <Button onClick={() => setOpen(true)}>Add Work</Button>
            )}
          </div>
        </div>
      )
      }
      < div className="mt-10 ml-6">
        {
          user?.workExperiences?.length ?
            user.workExperiences.map((work: any) => (
              <>
                <Experiences data={work} userId={userId} setOpen={() => handleOpenModal(work)} />
              </>
            ))
            :
            null
        }
      </div >
    </>
  );
};

export default Work;