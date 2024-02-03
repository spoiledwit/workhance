import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableCaption,
    TableRow,
} from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";



const Jobposts = () => {
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        handleFetchMyJobs();
    }, []);

    const handleFetchMyJobs = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URI}/job/myjobs`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <h1 className="text-xl font-semibold">Job Posts</h1>
            </div>
            <Table className="mt-5">
                <TableCaption>A list of all the jobs posted by you</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="pl-7">Type</TableHead>
                        <TableHead className="">Salary</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.jobs?.map((job: any) => (
                        <TableRow key={job._id}>
                            <TableCell className="font-medium">{job.jobTitle}</TableCell>
                            <TableCell className="max-w-[500px] text-nowrap overflow-clip ">
                                {job.jobDescription}
                            </TableCell>
                            <TableCell className="min-w-[100px] pl-7">
                                {capitalizeFirstLetter(job.jobType)}
                            </TableCell>
                            <TableCell className="">
                                {job.salary.min} - {job.salary.max} (AED)
                            </TableCell>
                            {/* @ts-ignore */}
                            <TableCell className="text-right">
                                <Button
                                    onClick={() => navigate(`/dashboard/job-details`, { state: job })}
                                >
                                    View
                                </Button>
                            </TableCell>
                            {/* <TableCell className="text-right"><Link to="/dashboard/job-details"><button className="bg-[#2d2d2d] text-white px-3 py-1 rounded hover:bg-[#1a1a1a] transition-all">View</button></Link></TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default Jobposts;
