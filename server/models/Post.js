import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        default: []
    }],
    video: {
        type: String,
        default: ""
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        default: []
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: []
    }],
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    }
}, {timestamps: true});

const PostModel = mongoose.model("Post", PostSchema);
export default PostModel;