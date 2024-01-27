import AuthModel from "../models/Auth.js";
import JobModel from "../models/Job.js";

export const getRecommendations = async (req, res) => {
  try {
    const { search } = req.body;
    const users = await AuthModel.find({
      name: { $regex: search, $options: "i" },
    }).limit(10);
    const formattedUsers = users.map((user) => ({
      _id: user._id,
      title: user.name,
      type: "Person",
      image: user.profilePicture,
      description: user.bio,
    }));
    const jobs = await JobModel.find({
      jobTitle: { $regex: search, $options: "i" },
    }).limit(10);
    const formattedJobs = jobs.map((job) => ({
      _id: job._id,
      title: job.jobTitle,
      type: "Job",
      image: null,
      description: job.jobDescription,
    }));
    const formattedResults = [...formattedUsers, ...formattedJobs];
    res.status(200).json(formattedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
