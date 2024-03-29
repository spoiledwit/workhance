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
import { EducationInfo } from "@/types";
import axios from "axios";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "../../ui/use-toast";

const EditEducation = ({
    open,
    setOpen,
    userId,
    oldName,
    oldBio,
    education
}: {
    open: boolean;
    setOpen: any;
    userId: string;
    oldName: string;
    oldBio?: string;
    education?: EducationInfo;
}) => {
    const [school, setSchool] = useState<string>(education?.school ? education.school : "");
    const [description, setDescription] = useState<string>(education?.description ? education.description : "");
    const [grade, setGrade] = useState<string>(education?.grade ? education.grade : "");
    const [degree, setDegree] = useState<string>(education?.degree ? education.degree : "");
    const [startYear, setStartYear] = useState<string>(education?.startYear ? education.startYear : "");
    const [endYear, setEndYear] = useState<string>(education?.endYear ? education.endYear : "");
    const [isCurrent, setIsCurrent] = useState<boolean>(education?.isCurrent ? education.isCurrent : false);
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();


    const handleUpdateEducation = async () => {
        try {
            setLoading(true);
            await axios.put(
                `${import.meta.env.VITE_BASE_URI}/auth/education/update/${education?._id}`,
                {
                    degree,
                    description,
                    startYear,
                    endYear,
                    school,
                    grade,
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
                description: "Your application has been submitted successfully",
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
                        placeholder="School"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Degree"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
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
                            Still enrolled
                        </label>
                    </div>
                </div>
                <DialogFooter className="justify-start">
                    <Button
                        variant="default"
                        onClick={() => {
                            handleUpdateEducation();
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

export default EditEducation;
