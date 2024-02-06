import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { VerificationData } from "./AdminPendingUsers";

const AdminVerification = ({
    open,
    setOpen,
    status
}: {
    open: boolean;
    setOpen: any;
    status: VerificationData;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const handleVerification = async () => {
        try {
            setLoading(true);
            await axios.put(
                `${import.meta.env.VITE_BASE_URI}/auth/verify`,
                {
                    verificationStatus: status.status,
                    userId: status.userId
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
            toast({
                title: "Success",
                description: status.status == "Verified" ? "Successfully verified user!" : "Successfully rejected user's verification!",
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
                    <DialogTitle>Verification Request</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to {status.status == "Verified" ? "accept this user's verification?" : "reject this user's verification?"}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 items-center flex-col">

                </div>
                <DialogFooter className="justify-start">
                    <Button
                        variant="default"
                        className="bg-[#2d2d2d] hover:bg-slate-950"
                        onClick={() => {
                            handleVerification();
                        }}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : status.status == "Verified" ? "Verify" : "Reject"}
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

export default AdminVerification;
