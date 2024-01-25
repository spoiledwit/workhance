import React from "react";
import { format } from "timeago.js";

interface UserType {
  _id: string;
  name: string;
  email: string;
  bio: string;
  followers: string[];
  profilePicture: string;
}

interface CommentType {
  _id: string;
  content: string;
  likes: string[];
  userId: UserType;
  postId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <div className="px-[20px] py-[10px] border">
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={comment.userId.profilePicture}
          alt={`${comment.userId.name}'s profile`}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <div className="text-sm">
          <strong>{comment.userId.name}</strong>
        </div>
      </div>
      <div className="mb-2 text-sm">
        <p>{comment.content}</p>
      </div>
      <div style={{ fontSize: "0.8rem", color: "#555" }}>
        <span>{format(comment.createdAt)}</span>
        <span style={{ marginLeft: "10px" }}>{comment.likes.length} likes</span>
      </div>
    </div>
  );
};

export default Comment;