import mongoose from "mongoose";

const EmployerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    postedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        default: []
    }],
    companyName: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
        default: ""
    },
    companySize: {
        type: String,
        default: ""
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    tokenExpiration: {
        type: Date,
    }
}, {timestamps: true});

const EmployerModel = mongoose.model("Employer", EmployerSchema);
export default EmployerModel;