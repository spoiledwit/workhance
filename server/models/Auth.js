import mongoose from "mongoose"

const AuthSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: ""
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    bio:{
        type: String,
        default: ""
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    }],
    conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }],
    recommendations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommendation"
    }],
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        default: null
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        default: null
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;