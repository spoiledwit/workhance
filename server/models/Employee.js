import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: ""
    },
    desiredJobTitles: [{
        type: String,
        default: []
    }],
    cv: {
        type: String,
        default: ""
    },
    educations: [{
        type: String,
        default: []
    }],
    workExperiences: [{
        type: String,
        default: []
    }],
    skills: [{
        type: String,
        default: []
    }],
    isDisabled: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
export default EmployeeModel;