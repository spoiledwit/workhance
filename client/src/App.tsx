import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./Layout";
import AdminLayout from "./pages/Admin/Layout";
import Profile from "./pages/Profile";
import useAuthStore from "./store/authStore";

const App = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user ? <Home /> : <Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user/:id" element={user ? <Profile /> : <Login />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route path="" element={<h1>Dashboard</h1>} />
          <Route path="users" element={<h1>Users</h1>} />
          <Route path="products" element={<h1>Products</h1>} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="categories" element={<h1>Categories</h1>} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
