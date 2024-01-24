import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "@/types";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      //router.get("/verify/:id", verify);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/auth/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId: any) => {
    //@ts-ignore
    if (!canApprove(user?.role)) {
      toast.error("You cannot approve this user");
      return;
    }
    try {
      await axios.get(
        `${import.meta.env.VITE_BASE_URI}/auth/approve/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const canApprove = (targetUserRole: string) => {
    if (user?.role === "Army Chief") {
      return true;
    }

    if (user?.role === "General" && targetUserRole === "Colonel") {
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-col p-10">
      {loading ? (
        <p className="text-violet-950 text-lg font-medium">Loading...</p>
      ) : (
        <>
          {users.map((personalle) => (
            <div
              key={personalle._id}
              className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-300"
            >
              <div className="mb-2 md:mb-0">
                <p className="text-lg font-semibold">{personalle.name}</p>
                <p className="text-gray-600">{personalle.email}</p>
                <p className="text-gray-500">{personalle.role}</p>
              </div>
              <button
                className={`transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50 ${
                  personalle.approved
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-violet-800 hover:bg-violet-900"
                }`}
                onClick={() =>
                  !personalle.approved && approveUser(personalle._id)
                }
                disabled={personalle.approved}
              >
                {personalle.approved
                  ? "Approved"
                  : canApprove(personalle.role)
                  ? "Approve"
                  : "Cannot Approve"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Users;
