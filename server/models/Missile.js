import mongoose from "mongoose";

const MissileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    launchCost: {
        type: Number,
        required: true,
    },
    purchaseCost: {
        type: Number,
        required: true,
    },
    range: {
        type: Number,
        required: true,
    },
    blastRadius: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("Missile", MissileSchema);