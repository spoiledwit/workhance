import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhotosUploader from "../Uploader/PhotosUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import { useEffect, useState } from "react";

const EditProfile = ({
  open,
  setOpen,
  userId,
  oldName,
  oldBio,
  profilePicture,
}: {
  open: boolean;
  setOpen: any;
  userId: string;
  oldName: string;
  oldBio?: string;
  profilePicture?: string;
}) => {
  const [name, setName] = useState<string>(oldName ? oldName : "");
  const [bio, setBio] = useState<string>(oldBio ? oldBio : "");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=>{
    if (profilePicture) {
        setImages([profilePicture]);
    }
  }, [])

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_BASE_URI}/auth/user`,
        {
          name: name,
          bio: bio,
          profilePicture: images[0],
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit your Workhance Profile</DialogTitle>
          <DialogDescription>
            This will be visible to other users on your profile page.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 items-center flex-col">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Label
            htmlFor="profilePicture"
            className="flex justify-center flex-col"
          >
            <span className="text-gray-500 whitespace-nowrap font-medium my-2">
              Profile Picture
            </span>
            <PhotosUploader
              maxPhotos={1}
              addedPhotos={images}
              onChange={setImages}
            />
          </Label>
        </div>
        <DialogFooter className="justify-start">
          <Button
            variant="default"
            onClick={() => {
              handleUpdateProfile();
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Save"}
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

export default EditProfile;
