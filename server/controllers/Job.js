import JobModel from "../models/Job.js";
import EmployerModel from "../models/Employer.js";
import ApplicationModel from "../models/Application.js";
import AuthModel from "../models/Auth.js";

export const createJob = async (req, res) => {
  try {
    const {
      employerId,
      companyName,
      businessEmail,
      companyWebsite,
      employeeCount,
      jobTitle,
      jobDescription,
      jobType,
      advertisingLocation,
      salary,
      updatesEmail,
      requireCv,
    } = req.body;

    const companyInfo = {
      name: companyName,
      email: businessEmail,
      website: companyWebsite,
      employeeCount: employeeCount,
    };

    const newJob = new JobModel({
      companyInfo,
      employerId: employerId,
      jobTitle,
      jobDescription,
      jobType,
      advertisingLocation,
      salary,
      updatesEmail,
      requireCv,
    });

    await newJob.save();
    await EmployerModel.findByIdAndUpdate(employerId, {
      $push: { postedJobs: newJob._id },
    });
    res.status(201).json({ message: "Job created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find().populate("employerId");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    let job = await JobModel.findById(req.params.id).populate("employerId");
    const user = await AuthModel.findOne({ employerId: job.employerId });
    res.status(200).json({
      job,
      user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const employer = await EmployerModel.findOne({
      userId: userId,
    });
    const jobs = await JobModel.find({ employerId: employer._id });
    res.status(200).json({
      employerProfile: employer,
      jobs: jobs,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const userId = req.userId;
    const employer = await EmployerModel.findOne({ userId });
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.employerId.toString() !== employer._id.toString()) {
      return res.status(401).json({ message: "Only the employer can update" });
    }
    const {
      jobTitle,
      jobDescription,
      jobType,
      advertisingLocation,
      salary,
      updatesEmail,
      requireCv,
    } = req.body;
    await JobModel.findByIdAndUpdate(jobId, {
      jobTitle,
      jobDescription,
      jobType,
      advertisingLocation,
      salary,
      updatesEmail,
      requireCv,
    });
    res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const userId = req.userId;
    const employer = await EmployerModel.findOne({ userId });
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.employerId.toString() !== employer._id.toString()) {
      return res.status(401).json({ message: "Only the employer can delete" });
    }
    await JobModel.findByIdAndDelete(jobId);
    await EmployerModel.findByIdAndUpdate(employer._id, {
      $pull: { postedJobs: jobId },
    });
    await ApplicationModel.deleteMany({ jobId });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};