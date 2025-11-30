import mongoose, { Schema } from "mongoose";
import { IRobotLog } from "../types/model.type";

const LogSchema = new Schema<IRobotLog>(
  {
    robotId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IRobotLog>("Log", LogSchema);
