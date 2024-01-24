import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
import useAuthStore from "./store/authStore";
import useSocketStore from "./store/socketStore";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { loginBack } from "./hooks/auth";
import { toast } from "react-hot-toast";
import SideBar from "./components/Admin/SideBar";
import Launch from "./components/Admin/Launch";

const Layout = () => {
  const { user } = useAuthStore();
  const { setSocket, socket } = useSocketStore();
  const { setUser, setToken } = useAuthStore();
  useEffect(() => {
    handleLoginBack();
  }, []);

  const handleLoginBack = async () => {
    try {
      const res = await loginBack();
      if (!res) {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        return;
      }
      setUser(res?.user);
      if (res?.token) {
        setToken(res.token);
      }
    } catch (error: any) {
      setToken("");
      setUser(null);
      localStorage.removeItem("token");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    try {
      const socketConnect = io("http://localhost:5000");
      setSocket(socketConnect);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user && socket) {
      socket.emit("addUser", user._id);
    }
  }, [user, socket]);

  return (
    <div className="min-h-screen">
      <Toaster />
      <div className="min-h-screen flex">
        <div className="md:w-56 lg:w-[15vw] w-fit fixed h-screen bg-white z-50">
          {user ? <SideBar /> : <></>}
        </div>
        <div className="md:w-4/5 lg:ml-[15vw] md:ml-56 ml-20">
          <Outlet />
          <div className="fixed bottom-0 right-0 mr-4 mb-4 cursor-pointer">
            {user ? <Launch /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
