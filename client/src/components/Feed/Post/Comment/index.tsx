import { Comment as CommentType } from "@/types";
import { Post } from "@/types";
import PostComment from "./PostComment";
import Comment from "./Comment";
import axios from "axios";
import { useEffect, useState } from "react";

const Commentor = ({ post, setPosts }: { post: Post; setPosts: any }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    handleGetComments();
  }, [post]);

  const handleGetComments = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/posts/${post._id}/comment`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {post._id && <PostComment postId={post._id} setPosts={setPosts} />}
      {loading && <div>Loading...</div>}
      {comments?.map((comment) => (
        //@ts-ignore
        <Comment comment={comment} key={comment._id} />
      ))}
    </div>
  );
};

export default Commentor;
