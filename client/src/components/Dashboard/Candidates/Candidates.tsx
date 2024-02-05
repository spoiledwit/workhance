import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

const Candidates = () => {

    const [candidates, setCandidates] = useState<any[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        handleFetchMyCandidates();
    }, [candidates])

    const handleFetchMyCandidates = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URI}/application/my-candidates`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setCandidates(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <h1 className="text-xl font-semibold">Applicants</h1>
            </div>
            <Table className="mt-5">
                <TableCaption>A list of all the candidates that applied to your job posts</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Applicant</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Bio</TableHead>
                        <TableHead>Time Applied</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {candidates?.map((app) => (
                        <TableRow key={app?.applicant._id}>
                            <TableCell className="font-medium flex flex-row items-center gap-3">
                                <img src={app?.applicant.profilePicture} className="w-[3rem] rounded-full" /><p>{app?.applicant.name}</p>
                            </TableCell>
                            <TableCell>{app?.applicant.email}</TableCell>
                            <TableCell className="max-w-[600px] text-nowrap overflow-clip">{app?.applicant.bio}</TableCell>
                            <TableCell className="max-w-[600px] text-nowrap overflow-clip">{format(app?.createdAt)}</TableCell>
                            <TableCell className="text-right ">
                                {/* <TableCell className="text-right"><Link to={{ pathname: '/dashboard/job-details', state: job } as JobState}><button className="bg-[#2d2d2d] text-white px-3 py-1 rounded hover:bg-[#1a1a1a] transition-all">View</button></Link></TableCell> */}
                                <button
                                    onClick={() => navigate(`/dashboard/candidate-details`, { state: app })}
                                    className="bg-[#2d2d2d] text-white px-3 py-1 rounded hover:bg-[#1a1a1a] transition-all">Applicant Details</button>
                                <button
                                    onClick={() => navigate(`/dashboard/job-details`, { state: app.job })}
                                    className="bg-[#2d2d2d] text-white px-3 py-1 rounded hover:bg-[#1a1a1a] transition-all ml-2">View Job</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table >
        </>
    )
}

export default Candidates 