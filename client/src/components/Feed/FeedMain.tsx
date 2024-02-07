import PostUploader from "./PostUploader";
import axios from "axios";
import Post from "./Post";
import { Post as PostType } from "@/types";
import { useEffect, useState } from "react";

export type BigPost = PostType & {
  authorId: {
    name: string;
    email: string;
    bio: string;
    profilePicture: string;
    _id: string;
    followers: string[];
  };
}

const FeedMain = () => {
  const [posts, setPosts] = useState<BigPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchPosts();
  }, []);

  const handleFetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/posts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-6 flex flex-col gap-2">
      <PostUploader />
      {posts.map((post) => (
        <Post key={post._id} post={post} setPosts={setPosts} />
      ))}
    </div>
  );
};

export default FeedMain;