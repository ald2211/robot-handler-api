import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnection";

config({ path: path.resolve(__dirname, "../.env") });
const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
connectDB();

//routes
app.get('/api/welcome',(req:Request,res:Response)=>res.json({message:'hi'}))


const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "frontEnd", "dist")));


// Catch-all route for undefined routes
app.use("/api", (req: Request, res: Response) => {
  res.status(404).json({message:'route not found'});
});

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, (err?: Error) => {
  if (err) {
    console.log("Failed to start server", err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
