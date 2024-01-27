import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/job`);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex px-32 py-10 min-h-screen bg-gray-100 flex-col">
      <h1 className="text-2xl font-medium text-gray-800">Find Jobs</h1>
      {loading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          <div
          className="flex flex-wrap gap-7"
          >
            {jobs.map((job: any) => (
              <div
                key={job._id}
                className="flex items-center w-[360px] justify-between px-4 py-2 mt-4 bg-white rounded-md shadow-md"
              >
                <div>
                  <h1 className="text-lg font-medium text-gray-800">
                    {job.jobTitle}
                  </h1>
                  <p className="text-sm font-light text-gray-500">
                    {job.jobDescription.length > 0
                        ? job.jobDescription.slice(0, 30) + "..."
                        : job.jobDescription}

                  </p>
                  <p className="text-sm font-light text-gray-500">
                    {job.jobType}
                  </p>
                  <p className="text-sm font-light text-gray-500">
                    {job.advertisingLocation}
                  </p>
                </div>
                <div>
                  <Link
                  to={`/job/${job._id}`}
                  className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-black/900 rounded-md"
                  >Apply</Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Jobs;