import mongoose, { Schema } from "mongoose";
import { IRobot } from "../types/model.type";

const RobotSchema = new Schema<IRobot>(
  { 
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },

    status: {
      battery: { type: Number, required: true },
      location: { type: String, required: true },
      mode: {
        type: String,
        enum: ["idle", "active", "charging"],
        required: true,
      },
      error: { type: String, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRobot>("Robot", RobotSchema);
