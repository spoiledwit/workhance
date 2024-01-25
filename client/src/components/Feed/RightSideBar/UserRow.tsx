import { User } from "@/types";
import { Link } from "react-router-dom";
import { TiWorld } from "react-icons/ti";
import { format } from "timeago.js";

const UserRow = ({
  user,
  sliceNum = 60,
  createdAt,
}: {
  user: User;
  sliceNum?: number;
  createdAt?: string;
}) => {
  return (
    <Link
      to={`/user/${user._id}`}
      className="flex space-x-2  cursor-pointer hover:bg-gray-200 p-2"
    >
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={user.profilePicture}
        alt=""
      />
      <div className="flex flex-col ml-2">
        <span className="font-semibold">{user.name}</span>
        <span className="text-gray-500 text-sm">
          {user?.bio?.slice(0, sliceNum).concat("...")}
        </span>
        {createdAt && (
          <div>
            <TiWorld className="inline-block text-sm text-gray-500 mr-1" />
            <span className="text-gray-500 text-xs">{format(createdAt)}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default UserRow;
