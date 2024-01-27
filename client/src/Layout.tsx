import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import { loginBack } from "./hooks/auth";
import { toast } from "react-hot-toast";
import { Toaster as Toaster2 } from "./components/ui/toaster";

const Layout = () => {
  
  const { setUser, setToken, setEmployer } = useAuthStore();

  useEffect(() => {
    handleLoginBack();
  }, []);

  const handleLoginBack = async () => {
    try {
      const res = await loginBack();
      if (!res) {
        setToken("");
        setUser(null);
        setEmployer(null);
        localStorage.removeItem("token");
        return;
      }
      setUser(res?.user.user);
      setEmployer(res?.user.employer);
      
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

  return (
    <div className="min-h-screen">
      <Toaster />
      <Toaster2 />
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
