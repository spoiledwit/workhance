import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    cv: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ApplicationModel = mongoose.model("Application", ApplicationSchema);
export default ApplicationModel;