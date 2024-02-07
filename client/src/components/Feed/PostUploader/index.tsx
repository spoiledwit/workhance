import useAuthStore from "@/store/authStore";
import { MdPhoto } from "react-icons/md";
import PostUploaderDialog from "./PostUploaderDialog";
import { useState } from "react";

const PostUploader = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <PostUploaderDialog open={open} setOpen={setOpen} />
      <div
        className="flex items-center gap-2 border rounded-md p-2 justify-between cursor-pointer hover:bg-gray-100 px-6 mb-3"
        onClick={() => setOpen(true)}
      >
        <span className="flex items-center gap-2 px-2 py-1 rounded-md ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user?.profilePicture}
            alt=""
          />
          <p className="text-gray-500 text-sm ml-2">
            What's on your mind,{" "}
            <span className="font-semibold">{user?.name.split(" ")[0]}</span>?
          </p>
        </span>
        <span className="flex items-center gap-2 px-2 py-1 rounded-md">
          <MdPhoto className="text-gray-500 text-2xl" />
        </span>
      </div>
    </div>
  );
};

export default PostUploader;
