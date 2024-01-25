import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    }
}, {timestamps: true});

const RecommendationModel = mongoose.model("Recommendation", RecommendationSchema);
export default RecommendationModel;