import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404 Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/login" className="text-white bg-violet-500 hover:bg-violet-700 font-medium py-2 px-4 rounded">
            Login
        </Link>
        <p className="mt-4 text-gray-600">Or, if you think this is a mistake, head back to the <Link to="/" className="text-violet-500 hover:underline">homepage</Link>.</p>
    </div>
  )
}

export default NotFound;