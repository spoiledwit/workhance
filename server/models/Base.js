import mongoose from "mongoose";
const BaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    region: {
      type: String,
      required: true,
    },
    missiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Missile",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Base", BaseSchema);