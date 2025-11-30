import { Request, Response,NextFunction } from "express";
import Robot from "../models/robot.model";
import Log from "../models/logs.model";
import { createLogSchema } from "../utils/validator";
import { errorHandler } from "../utils/customError";


export const createLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Joi validation
    const { error } = createLogSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return next(errorHandler(400, error.details[0].message));
    }

    // Check if robot exists
    const robot = await Robot.findOne({ id: req.body.robotId });

    if (!robot) {
      return next(errorHandler(404, "Robot not found"));
    }

    // Create log entry
    const log = await Log.create({
      robotId: req.body.robotId,
      message: req.body.message,
      timestamp: new Date(),
    });

    return res.status(201).json({
      message: "Log created",
      log,
    });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const getLogsByRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure robot exists
    const robot = await Robot.findOne({ id: req.params.id });

    if (!robot) {
      return next(errorHandler(404, "Robot not found"));
    }

    // Fetch logs
    const logs = await Log.find({ robotId: req.params.id }).sort({
      timestamp: -1,
    });

    return res.json(logs);
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};
