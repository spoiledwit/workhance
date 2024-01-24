import useAuthStore from "@/store/authStore";
import LoginFirst from "@/components/Login";
import Cards from "@/components/Dashboard/Cards";
import { getStats } from "@/hooks/auth";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalPersonnel: 0,
    totalMissiles: 0,
    totalLaunches: 0,
    totalBases: 0,
  });
  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    setLoading(true);
    const state = await getStats();
    setStats({
      totalPersonnel: state?.stats?.users,
      totalMissiles: state?.stats?.missiles,
      totalLaunches: state?.stats?.launches,
      totalBases: state?.stats?.bases,
    });
    setLoading(false);
  };

  return (
    <div className="flex justify-center p-10">
      <div className="w-full">
        {user ? (
          <div>
            <h1 className="font-medium text-3xl text-violet-950 mb-1">
              Weclome {user.name}!
            </h1>
            <h2 className="text-md text-violet-950 mb-6">
              You are logged in as {user.role}
            </h2>
            <div>
              {loading ? (
                <p
                className="text-violet-950 text-lg font-medium"
                >Loading...</p>
              ) : (
                <Cards
                  totalBases={stats.totalBases}
                  totalLaunches={stats.totalLaunches}
                  totalMissiles={stats.totalMissiles}
                  totalPersonnel={stats.totalPersonnel}
                />
              )}
            </div>
          </div>
        ) : (
          <LoginFirst />
        )}
      </div>
    </div>
  );
};

export default Home;
