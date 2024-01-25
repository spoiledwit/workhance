import useAuthStore from "@/store/authStore";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

const PostComment = ({
  postId,
  setPosts,
}: {
  postId: string;
  setPosts: any;
}) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = async (e: any) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/posts/${postId}/comment`,
        {
          content: e.target[0].value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      e.target[0].value = "";
      setPosts((posts: any) =>
        posts.map((post: any) =>
          post._id === postId ? res.data : post
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 px-8">
      <img src={user?.profilePicture} alt="" className="w-8 h-8 rounded-full" />
      <form
        onSubmit={handleSubmitComment}
        className="flex items-center w-full rounded-md px-3 py-1"
      >
        <Input
          placeholder="Write a comment..."
          className="border-none focus-visible:ring-0 w-full outline-none ring-0 focus:ring-0 focus:border-none focus:outline-none"
        />
      </form>
    </div>
  );
};

export default PostComment;
