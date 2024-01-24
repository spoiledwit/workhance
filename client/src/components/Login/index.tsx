import { Link } from "react-router-dom";

const LoginFirst = () => {
  return (
    <div className="flex mt-40 flex-col items-center justify-center max-w-md mx-auto p-6 bg-violet-100 rounded-xl shadow-lg space-y-4">
      <h1 className="text-xl font-semibold text-violet-800">Welcome, Army Personnel!</h1>
      <p className="text-center text-gray-600">Access your dashboard by logging in or registering.</p>
      <div className="flex space-x-4">
        <Link to="/login" className="px-4 py-2 bg-violet-800 text-white rounded hover:bg-violet-600 transition duration-300">
          Login
        </Link>
        <Link to="/register" className="px-4 py-2 border border-violet-500 text-violet-500 rounded hover:bg-violet-50 transition duration-300">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginFirst;