
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
import { format } from 'timeago.js'
import { User } from "@/types";



const AdminUsers = () => {
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        handleFetchAllUsers();
    }, []);

    const handleFetchAllUsers = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URI}/auth/users`,
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
                <h1 className="text-xl font-semibold">All Users</h1>
            </div>
            <Table className="mt-5">
                <TableCaption>A list of all users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Name</TableHead>
                        <TableHead className="pl-7">Email</TableHead>
                        <TableHead>Bio</TableHead>
                        <TableHead className="text-center">Followers</TableHead>
                        <TableHead className="">Time Created</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((user: User) => (
                        <TableRow key={user._id}>
                            <TableCell className="font-medium flex flex-row items-center gap-3">
                                <img src={user.profilePicture} className="w-[3rem] rounded-full" /><p>{user.name}</p>
                            </TableCell>
                            <TableCell className="min-w-[100px] pl-7">
                                {user.email}
                            </TableCell>
                            <TableCell className="max-w-[500px] text-nowrap overflow-clip ">
                                {user.bio}
                            </TableCell>
                            <TableCell className="text-center">
                                {user.followers.length}
                            </TableCell>
                            <TableCell className="max-w-[500px] text-nowrap overflow-clip ">
                                {/* @ts-ignore */}
                                {capitalizeFirstLetter(format(user.createdAt))}
                            </TableCell>
                            {/* @ts-ignore */}
                            <TableCell className="text-right">
                                <Button
                                    onClick={() => navigate(`/user/${user._id}`)}
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

export default AdminUsers;
