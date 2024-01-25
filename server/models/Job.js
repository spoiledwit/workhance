import mongoose from "mongoose";

const CompanyInfoSchema = new mongoose.Schema({
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    logo: {
        type: String,
        default: ""
    },
    employeeCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const JobSchema = new mongoose.Schema({
    companyInfo: {
        type: CompanyInfoSchema,
        required: true
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    advertisingLocation: {
        type: String,
        required: true
    },
    salary: {
        exactAmount: {
            type: Number,
            default: null
        },
        range: {
            min: {
                type: Number,
                default: null
            },
            max: {
                type: Number,
                default: null
            }
        },
        startingAmount: {
            type: Number,
            default: null
        },
        maxAmount: {
            type: Number,
            default: null
        }
    },
    updatesEmail: {
        type: String,
        required: true
    },
    requireCv: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "active"
    }
}, {timestamps: true});

const JobModel = mongoose.model("Job", JobSchema);
export default JobModel;