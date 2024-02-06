import mongoose from "mongoose";

const CompanyInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    employeeCount: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const JobSchema = new mongoose.Schema(
  {
    companyInfo: {
      type: CompanyInfoSchema,
      required: true,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    advertisingLocation: {
      type: String,
      required: true,
    },
    salary: {
      min: {
        type: Number,
        default: null,
      },
      max: {
        type: Number,
        default: null,
      },
    },
    updatesEmail: {
      type: String,
      required: true,
    },
    requireCv: {
      type: Boolean,
      default: false,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    shortlisted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("Job", JobSchema);
export default JobModel;
