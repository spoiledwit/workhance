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
import { WorkExperience } from "@/types";
import axios from "axios";
import {  useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "../../ui/use-toast";

const EditWorkExperience = ({
    open,
    setOpen,
    userId,
    work
}: {
    open: boolean;
    setOpen: any;
    userId: string;
    work?: WorkExperience;
}) => {
    const [company, setCompany] = useState<string>(work?.company ? work.company : "");
    const [description, setDescription] = useState<string>(work?.description ? work.description : "");
    const [position, setPosition] = useState<string>(work?.position ? work?.position : "");
    const [startYear, setStartYear] = useState<string>(work?.startYear ? work.startYear : "");
    const [endYear, setEndYear] = useState<string>(work?.endYear ? work.endYear : "");
    const [isCurrent, setIsCurrent] = useState<boolean>(work?.isCurrent ? work.isCurrent : false);
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();



    const handleUpdateWorkExperience = async () => {
        try {
            setLoading(true);
            await axios.put(
                `${import.meta.env.VITE_BASE_URI}/auth/work/update/${work?._id}`,
                {
                    position,
                    description,
                    startYear,
                    endYear,
                    company,
                    isCurrent,
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

            toast({
                title: "Success",
                description: "Your experience has been updated successfully",
                variant: "default",
            });
            setOpen(false);
            setLoading(false);
        }
    };


    return (
        <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit education</DialogTitle>
                    <DialogDescription>
                        This will be visible to other users on your profile page.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 items-center flex-col">
                    <Input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex flex-row w-full justify-between gap-2">
                        <Input
                            type="text"
                            placeholder="Starting Year"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Ending Year"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center self-start space-x-2">
                        <Checkbox id="terms" defaultChecked={isCurrent} />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Presently working
                        </label>
                    </div>
                </div>
                <DialogFooter className="justify-start">
                    <Button
                        variant="default"
                        onClick={() => {
                            handleUpdateWorkExperience();
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

export default EditWorkExperience;
