import { HiOutlineInformationCircle } from "react-icons/hi";
import { User } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import UserRow from "./UserRow";

const RightSideBar = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/auth/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(res.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded w-1/3 max-h-[550px] p-4">
      <span className="flex items-center justify-between">
        <h3 className="font-semibold mb-2">Add to your feed</h3>
        <HiOutlineInformationCircle />
      </span>
      {loading && (
        <>
          <p>Loading...</p>
        </>
      )}

      {!loading && users.length === 0 && (
        <>
          <p className="text-gray-500 text-sm">No recommendations found</p>
        </>
      )}

      {!loading && users.length > 0 && (
        <>
          {users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default RightSideBar;
