import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { EducationInfo } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../../ui/use-toast";

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
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const handleDeleteEducation = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `${import.meta.env.VITE_BASE_URI}/auth/education/delete/${data._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        } finally {
            toast({
                title: "Success",
                description: "Education details removed.",
                variant: "default",
            });
            setLoading(false);
            window.location.reload();
        }
    };

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
                            handleDeleteEducation();
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
