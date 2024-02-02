import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./Layout";
import Profile from "./pages/Profile";
import useAuthStore from "./store/authStore";
import PostJob from "./pages/PostJob";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";
import Dashboard from "./pages/Dashboard";
import Jobposts from "./components/Dashboard/JobPosts/Jobposts";
import DashboardHome from "./components/Dashboard/Home/DashboardHome";
import Candidates from "./components/Dashboard/Candidates/Candidates";

const App = () => {
  const { user } = useAuthStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={user ? <Home /> : <Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user/:id" element={user ? <Profile /> : <Login />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="job/:id" element={<Job />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/job-posts" element={<Jobposts />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
