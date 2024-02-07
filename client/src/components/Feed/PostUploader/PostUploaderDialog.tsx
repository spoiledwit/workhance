import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GrGallery } from "react-icons/gr";
import { useState } from "react";
import axios from "axios";

const PostUploaderDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const [imageFile, setImageFile] = useState<any>(null);

  const handlePost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[600px] xl:max-w-lg md:max-w-lg lg:max-w-lg sm:max-w-[400px] max-w-[350px] overflow-y-auto rounded">
        <DialogHeader>
          <DialogTitle>Post</DialogTitle>
          <DialogDescription>
            Share your thoughts with the world.
          </DialogDescription>
        </DialogHeader>
        <div className="flex rounded-md flex-col">
          <textarea
            disabled={loading}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className={`w-full h-full p-4 resize-none outline-none border-none ${!imageFile && "min-h-[200px]"
              } `}
          />
          {imageFile && (
            <div className="w-full h-full p-4 resize-none outline-none border-none">
              <img
                src={imageFile && URL.createObjectURL(imageFile)}
                alt="post"
                className="object-contain w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-4">
          {/*  adding an upload image */}
          <label htmlFor="file">
            <GrGallery className="text-2xl text-gray-400 cursor-pointer" />
          </label>
          <input
            disabled={loading}
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>
        <DialogFooter className="justify-start border-t pt-4 flex flex-col-reverse gap-2 xl:gap-0 lg:gap-0 md:gap-0 ">
          <Button
            variant="default"
            onClick={() => {
              handlePost();
            }}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostUploaderDialog;
