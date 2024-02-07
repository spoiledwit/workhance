import ApplicationModel from "../models/Application.js";
import JobModel from "../models/Job.js";
import AuthModel from "../models/Auth.js";
import EmployerModel from "../models/Employer.js";

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

export const shortlistApplication = async (req, res) => {
  try {
    const { applicationId, jobId } = req.body;
    console.log("App: ", applicationId)
    console.log("Job: ", jobId);
    const application = await ApplicationModel.findById(applicationId);
    const job = await JobModel.findById(jobId);

    // update the applicants status 
    application.status = "accepted";
    await application.save();

    // remove the applicant from the applications array and append it to shortlisted array 
    await JobModel.findByIdAndUpdate(jobId, {
      $push: { shortlisted: application._id },
      $pull: { applications: application._id }
    });

    res.status(201).json({ message: "Application created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllMyCandidates = async (req, res) => {
  try {
    const userId = req.userId;
    // fetching the employer
    const employer = await EmployerModel.findOne({ userId: userId });
    // now for all the jobs posted by the employer we will fetch the applications
    const jobsIds = employer.postedJobs;
    const allApplications = await ApplicationModel.find({
      jobId: { $in: jobsIds },
      status: "pending"
    })
      .populate("applicantId")
      .populate("jobId");
    // now renaming the applicantId to applicant and jobId to job
    const formattedApplications = allApplications.map((application) => {
      return {
        applicant: application.applicantId,
        job: application.jobId,
        status: application.status,
        cv: application.cv,
        id: application._id,
        createdAt: application.createdAt
      };
    });
    res.status(200).json(formattedApplications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const userId = req.userId;
    const employer = await EmployerModel.findOne({ userId });
    const applicationId = req.params.id;
    const application = await ApplicationModel.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    const jobId = application.jobId;
    if (!employer.postedJobs.includes(jobId)) {
      return res.status(401).json({ message: "Only the employer can delete" });
    }
    await ApplicationModel.findByIdAndDelete(applicationId);
    await JobModel.findByIdAndUpdate(application.jobId, {
      $pull: { applications: applicationId },
    });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}