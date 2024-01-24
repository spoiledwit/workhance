import mongoose from "mongoose";

const LaunchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    missileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Missile",
    },
    baseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
    },
    target: {
        longitude: {
            type: Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
    },
    targetName: {
        type: String,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Launch", LaunchSchema);