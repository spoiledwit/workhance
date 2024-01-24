import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Layout from "./Layout";
import LoginFirst from "./components/Login";
import useAuthStore from "./store/authStore";
import NotFound from "./components/NotFound";
import VerifyEmailFirst from "./components/VerifyEmail";
import ApprovalAwaiting from "./components/ApprovalAwaiting";
import Launch from "./pages/Launch";
import Bases from "./pages/Bases";
import MissilePods from "./pages/MissilePods";
import Launches from "./pages/Launches";

const App = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {user ? (
          user.verify ?
          user.approved ?
          (
            <>
              <Route index element={<Home />} />
              <Route path="/military-personnel" element={<Users />} />
              <Route path="/bases" element={<Bases />} />
              <Route path="/missile-pods" element={<MissilePods />} />
              <Route path="/launch" element={<Launch />} />
              <Route path="/launches" element={<Launches />} />
            </>
          ) :
          (
            <>
              <Route index element={<ApprovalAwaiting />} />
              <Route path="*" element={<ApprovalAwaiting />} />
            </>
          ):
          (
            <>
              <Route index element={<VerifyEmailFirst />} />
              <Route path="*" element={<VerifyEmailFirst />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </>
          )
        ) : (
          <>
            <Route index element={<LoginFirst />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<LoginFirst />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
