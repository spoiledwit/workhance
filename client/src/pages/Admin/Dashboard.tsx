import Card from "@/components/Dashboard/Home/Card";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {

  const [users, setUsers] = useState<number>(0);
  const [jobs, setJobs] = useState<number>(0);
  const [pending, setPending] = useState<number>(0);

  useEffect(() => {
    handleFetchAllUsers();
    handleFetchAllJobs();
    handleFetchPendingUsers();
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
      setUsers(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchAllJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/job`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setJobs(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchPendingUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/auth/pending-users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPending(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row gap-3">
      {/* @ts-ignore */}
      <Card twClass="bg-[#F2F2F2] w-1/3" label="Total Users" data={users} />
      {/* @ts-ignore */}
      <Card twClass="bg-[#F2F2F2] w-1/3" label="Total Jobs" data={jobs} />
      {/* @ts-ignore */}
      <Card twClass="bg-[#F2F2F2] w-1/3" label="Pending Verifications" data={pending} />

    </div>
  )
}

export default Dashboard;