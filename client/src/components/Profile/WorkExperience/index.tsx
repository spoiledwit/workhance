import useAuthStore from "@/store/authStore";
import AddWork from "./AddWork";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Work = ({ userId }: { userId: string }) => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center  mt-20 h-full w-full text-gray-500 text-2xl">
      {!user?.workExperiences?.length && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-bold">No Work</h1>
          {user?._id === userId && (
            <AddWork open={open} setOpen={setOpen} userId={userId} />
          )}
          {user?._id === userId && (
            <Button onClick={() => setOpen(true)}>Add Work</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Work;