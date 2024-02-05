
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EducationInfo } from "@/types";
import axios from "axios";

import { useEffect, useState } from "react";

const DeleteEducation = ({
    open,
    setOpen,
    userId,
    data,

}: {
    open: boolean;
    setOpen: any;
    userId: string;
    data: EducationInfo;
}) => {
    // const [name, setName] = useState<string>(educationDegree ? educationDegree : "");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
    }, [])

    // const handleUpdateProfile = async () => {
    //     try {
    //         setLoading(true);
    //         await axios.put(
    //             `${import.meta.env.VITE_BASE_URI}/auth/user`,
    //             {
    //                 name: name,
    //                 bio: bio,
    //                 profilePicture: images[0],
    //                 userId: userId,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                 },
    //             }
    //         );
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Education</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete your <span className="font-semibold">{data.school}</span> education?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 items-center flex-col">

                </div>
                <DialogFooter className="justify-start">
                    <Button
                        variant="default"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {
                            // handleUpdateProfile();
                        }}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Delete"}
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

export default DeleteEducation;
