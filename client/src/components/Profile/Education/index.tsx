import useAuthStore from "@/store/authStore";
import AddEducation from "./AddEducation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EducationInfo } from "@/types";
import Educations from "./Educations";
import EditEducation from "./EditEducation";

const Education = ({ userId }: { userId: string }) => {
  const { user } = useAuthStore();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<EducationInfo>()

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

      {!user?.educations?.length && (
        <div className="flex flex-col items-center  mt-20 h-full w-full text-gray-500 text-2xl">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-4xl font-bold">No Education</h1>
            {user?._id === userId && (
              <AddEducation open={open} setOpen={setOpen} userId={userId} />
            )}
            {user?._id === userId && (
              <Button onClick={() => setOpen(true)}>Add Education</Button>
            )}
          </div>
        </div>
      )}

      < div className="mt-1 ml-6">
        {
          user?.educations?.length ?
            user.educations.map((edu: EducationInfo) => (
              <>
                <Educations data={edu} userId={userId} setOpen={handleOpenModal} />
              </>
            ))
            :
            null
        }
      </div >
    </>
  );
};

export default Education;
