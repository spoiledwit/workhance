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
import { useToast } from "../../ui/use-toast";

const VerificationRequest = ({
    open,
    setOpen,
    userId,
}: {
    open: boolean;
    setOpen: any;
    userId: string;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const handleVerification = async () => {
        try {
            setLoading(true);
            await axios.put(
                `${import.meta.env.VITE_BASE_URI}/auth/verify`,
                {
                    verificationStatus: "Pending",
                    userId
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
                description: "Verification request sent!",
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
                    <DialogTitle>Request Verification</DialogTitle>
                    <DialogDescription>
                        Account verification could take a few days.
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
                        {loading ? "Loading..." : "Send Request"}
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

export default VerificationRequest;
