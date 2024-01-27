import ApplicationModel from "../models/Application.js";
import JobModel from "../models/Job.js";

export const createApplication = async (req, res) => {
  try {
    const applicantId = req.userId;
    const { jobId, cv } = req.body;

    const existingApplication = await ApplicationModel.findOne({
      applicantId,
      jobId,
    });


    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employerId === applicantId) {
      return res
        .status(400)
        .json({ message: "You cannot apply to your own job" });
    }


    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied" });
    }

    const newApplication = new ApplicationModel({
      applicantId,
      jobId,
      cv,
    });
    if (job.requireCv && !cv) {
      return res.status(400).json({ message: "CV is required" });
    }
    await newApplication.save();
    await JobModel.findByIdAndUpdate(jobId, {
      $push: { applications: newApplication._id },
    });
    res.status(201).json({ message: "Application created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
