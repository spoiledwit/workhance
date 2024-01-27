import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "@/components/JobApplication/Form";
import UserRow from "@/components/Feed/RightSideBar/UserRow";

const Job = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getJob();
  }, []);

  const getJob = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/job/${id}`);
      setJob(res.data.job);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Job not found.</p>
      </div>
    );
  }

  return (
    <div className="flex px-32 py-10 min-h-screen bg-gray-100">
      <div className="container mx-auto bg-white rounded-lg shadow-md flex gap-10 w-full">
        {/* Form Section */}
        <div className="w-2/3 p-8">
          <h2 className="text-2xl font-semibold mb-6">Apply for this Job</h2>
          <Form 
          job={job}
          />
        </div>

        {/* Job Info Section */}
        <div className="w-1/3 p-8 border-l border-gray-300">
          <div className="space-y-4">

            <div>
              <h2 className="text-2xl font-medium text-gray-800">
                {job.jobTitle}
              </h2>
              <p className="text-sm text-gray-500">{job.advertisingLocation}</p>
            </div>

            <div>
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {job.companyInfo.name}
                  </h3>
                  <a
                    href={job.companyInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm"
                  >
                    {job.companyInfo.website}
                  </a>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Employees: {job.companyInfo.employeeCount}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Salary Range</h4>
              <p className="text-gray-700">
                AED{job.salary.min.toLocaleString()} - AED
                {job.salary.max.toLocaleString()}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Job Type</h4>
              <p className="text-gray-700 capitalize">{job.jobType}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Job Description</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {job.jobDescription}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">Contact Email</h4>
              <p className="text-blue-500">{job.companyInfo.email}</p>
            </div>
            <div>
              <h4
              className="font-semibold text-gray-800"
              >
                Posted by{" "}
              </h4>
              <UserRow user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
