import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    bio: {
      type: String,
      default: "",
    },
    verificationStatus: {
      type: String,
      default: "Not Verified",
    },
    educations: [
      {
        school: {
          type: String,
          default: "",
        },
        degree: {
          type: String,
          default: "",
        },
        fieldOfStudy: {
          type: String,
          default: "",
        },
        startYear: {
          type: String,
          default: "",
        },
        endYear: {
          type: String,
          default: "",
        },
        grade: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        isCurrent: {
          type: Boolean,
          default: false,
        },
      },
    ],
    workExperiences: [
      {
        company: {
          type: String,
          default: "",
        },
        position: {
          type: String,
          default: "",
        },
        startYear: {
          type: String,
          default: "",
        },
        endYear: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        isCurrent: {
          type: Boolean,
          default: false,
        },
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
      },
    ],
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    recommendations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommendation",
      },
    ],
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;
