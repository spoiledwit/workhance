import useAuthStore from "@/store/authStore";
import AddEducation from "./AddEducation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Education = ({ userId }: { userId: string }) => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center  mt-20 h-full w-full text-gray-500 text-2xl">
      {!user?.educations?.length && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-bold">No Education</h1>
          {user?._id === userId && (
            <AddEducation open={open} setOpen={setOpen} userId={userId} />
          )}
          {user?._id === userId && (
            <Button onClick={() => setOpen(true)}>Add Education</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Education;
