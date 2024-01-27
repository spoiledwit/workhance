import { BigPost } from "../FeedMain";
import UserRow from "../RightSideBar/UserRow";
import Reactor from "./Reactor";
import { useState } from "react";
import Commentor from "./Comment";
import CaptionComponent from "./PostCaption";

const Post = ({ post, setPosts }: { post: BigPost, setPosts:any }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full rounded-md border">
      <UserRow user={post.authorId} sliceNum={70} createdAt={post.createdAt} />
      <hr />
      <div className="flex p-3 flex-col gap-3">
        <CaptionComponent caption={post.caption} />
        {post.images && post.images.length > 0 && (
          <img src={post.images[0]} className="p-6" alt="" />
        )}
      </div>
      <Reactor post={post} setOpen={setOpen} open={open} />
      {open && <Commentor post={post} setPosts={setPosts}/>}
    </div>
  );
};

export default Post;