import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { WorkExperience } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../../ui/use-toast";

const DeleteWorkExperience = ({
    open,
    setOpen,
    data,

}: {
    open: boolean;
    setOpen: any;
    data: WorkExperience;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const handleDeleteWorkExperience = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `${import.meta.env.VITE_BASE_URI}/auth/work/delete/${data._id}`,
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
                description: "Experience details removed.",
                variant: "default",
            });
            setLoading(false);
        }
    };

    return (
        <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Experience</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete your <span className="font-semibold">{data.company}</span> experience?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 items-center flex-col">

                </div>
                <DialogFooter className="justify-start">
                    <Button
                        variant="default"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {
                            handleDeleteWorkExperience();
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

export default DeleteWorkExperience;
