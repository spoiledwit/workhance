import { MdOutlineMessage } from "react-icons/md";
import { BiBriefcase } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LeftSideBarTop = () => {
  const links = [
    {
      name: "Inbox",
      icon: <MdOutlineMessage />,
      path: "/",
    },
    {
      name: "My Jobs",
      icon: <BiBriefcase />,
      path: "/jobs",
    },
  ];

  return (
    <div className="p-4 rounded">
      {links.map((link) => (
        <Link
          to={link.path}
          key={link.name}
          className="flex hover:bg-gray-100 px-3 py-1 rounded-md items-center justify-between mb-2"
        >
          <span className="flex items-center gap-2">
            {link.icon}
            <h3 className="font-semibold">{link.name}</h3>
          </span>
        </Link>
      ))}
    </div>
  );
};

const LeftSideBarBottom = () => {
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
    <div className="p-4 rounded">
      <h3 className="font-semibold mb-2">Recent Jobs</h3>
      <div className="flex items-center gap-2 mb-2">
        {loading ? (
          <></>
        ) : (
          <div
          className="flex flex-wrap gap-3 mt-2"
          >
            {jobs.map((job: any) => (
              <Link
                to={`/job/${job._id}`}
                key={job._id}
                className="flex items-center gap-2 rounded-md"
              >
                <div className="flex gap-2">
                  <div className="flex items-center justify-center p-3 max-h-10 bg-gray-200 rounded-md">
                    <BiBriefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{job.jobTitle}</h3>
                    <p
                    className="text-xs font-light text-gray-500"
                    >
                      {job.advertisingLocation}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LeftSideBar = () => {
  return (
    <div className="w-1/3 rounded max-h-[550px] border">
      <LeftSideBarTop />
      <hr />
      <LeftSideBarBottom />
    </div>
  );
};

export default LeftSideBar;
