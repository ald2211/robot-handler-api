import mongoose from "mongoose";

//user model type
export interface IUser extends Document {
  email: string;
  password: string;
}

//robot model type
export interface IRobot {
  userId: mongoose.Schema.Types.ObjectId;
  id: string;
  name: string;
  type: string;
  status: {
    battery: number;
    location: string;
    mode: "idle" | "active" | "charging";
    error?: string | null;
  };
}


//logs model type
export interface IRobotLog {
  robotId: string;
  message: string;
  timestamp?: Date;
}

