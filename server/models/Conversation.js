import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    }]
}, {timestamps: true});

const ConversationModel = mongoose.model("Conversation", ConversationSchema);
export default ConversationModel;