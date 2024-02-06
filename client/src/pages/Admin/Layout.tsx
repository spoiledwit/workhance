import { Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import SideBar from "@/components/Admin/SideBar";
import { Link } from "react-router-dom";

const AdminLayout = () => {
  const { user } = useAuthStore();

  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center">
  //       <p className="text-2xl font-bold text-gray-700">
  //         You are not authorized to view this page. Please login as an admin.
  //       </p>
  //       <Link
  //         to={"/login"}
  //       >
  //         <p className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg mt-4">
  //           Login
  //         </p>
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen relative flex">
      <SideBar />
      <div className="w-full p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;