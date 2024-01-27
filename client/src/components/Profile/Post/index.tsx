import Post from "@/components/Feed/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { BigPost } from "@/components/Feed/FeedMain";

const ProfilePosts = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = useState<BigPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetPosts();
  }, [userId]);

  const handleGetPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/posts/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    className={`max-w-2xl ${posts.length > 0 ? "mr-auto" : "mt-10 ml-10" }`}
    >
      {loading && <div className="text-center">Loading...</div>}
      {!loading && posts.length === 0 && (
        <div
        className="flex flex-col items-center  mt-10 ml-20 h-full w-full text-gray-500 text-2xl"
        >
            No Posts yet
        </div>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} setPosts={setPosts} />
      ))}
    </div>
  );
};

export default ProfilePosts;
