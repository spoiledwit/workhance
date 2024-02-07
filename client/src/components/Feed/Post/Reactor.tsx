import useAuthStore from "@/store/authStore";
import { Post } from "@/types";
import { BiLike } from "react-icons/bi";
import { MdOutlineInsertComment } from "react-icons/md";
import { GrShare } from "react-icons/gr";
import axios from "axios";
import { useState } from "react";

const Reactor = ({ post, setOpen, open }: { post: Post; setOpen: any, open: any }) => {
  const { user } = useAuthStore();
  const [likes, setLikes] = useState(post.likes);

  const handleLikePost = async () => {
    try {
      if (likes && user?._id) {
        setLikes([...likes, user?._id]);
      } else if (user?._id) {
        setLikes([user?._id]);
      }

      await axios.put(
        `${import.meta.env.VITE_BASE_URI}/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikePost = async () => {
    try {
      if (likes && user?._id) {
        setLikes(likes.filter((like) => like !== user?._id));
      }
      await axios.put(
        `${import.meta.env.VITE_BASE_URI}/posts/${post._id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border px-8 flex items-center justify-between">
      <div
        className="flex items-center text-2xl gap-2 text-gray-700 py-3"
        onClick={
          likes?.find((like) => like === user?._id)
            ? handleDislikePost
            : handleLikePost
        }
      >
        <p className="text-lg">{likes?.length}</p>
        <BiLike
          style={{
            transform: "rotateY(180deg)",
          }}
          className={`cursor-pointer ${likes?.find((like) => like === user?._id) && "text-blue-500"
            }`}
        />
        <p
          className={`text-[15px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-medium cursor-pointer ${likes?.find((like) => like === user?._id) && "text-blue-500"
            }`}
        >
          Like
        </p>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center text-2xl gap-2 text-gray-700 py-3"
      >
        <p className="text-lg">{post.comments?.length}</p>
        <MdOutlineInsertComment />
        <p className="text-[15px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-medium cursor-pointer">Comment</p>
      </div>
      <div className="flex items-center text-lg gap-2 text-gray-700 py-3">
        <GrShare />
        <p className="text-[15px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-medium cursor-pointer">Send</p>
      </div>
    </div>
  );
};

export default Reactor;
