import LeftSideBar from "@/components/Feed/LeftSideBar.tsx";
import RightSideBar from "@/components/Feed/RightSideBar";
import FeedMain from "@/components/Feed/FeedMain";

const Home = () => {
  
  return (
    <div className="min-h-screen flex justify-between px-32 py-4">
      <LeftSideBar />
      <FeedMain />
      <RightSideBar />
    </div>
  );
};

export default Home;