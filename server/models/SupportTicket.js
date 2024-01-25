import mongoose from "mongoose";

const SupportTicketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const SupportTicketModel = mongoose.model("SupportTicket", SupportTicketSchema);
export default SupportTicketModel;