import { createRobotSchema, updateRobotStatusSchema } from './../utils/validator';
import { Request, Response, NextFunction } from "express";
import Robot from "../models/robot.model";
import { errorHandler } from '../utils/customError';


// CREATE ROBOT
export const createRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Joi validation
    const { error } = createRobotSchema.validate(req.body, {
      abortEarly: true,
    });
    const userId = (req as any).user.id;
    if (error) {
      return next(errorHandler(400, error.details[0].message));
    }

    // Create robot in DB
    const robot = await Robot.create({...req.body,userId});

    return res.status(201).json({
      message: "Robot registered",
      robot,
    });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};


export const updateRobotStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Joi validation
    const { error } = updateRobotStatusSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return next(errorHandler(400, error.details[0].message));
    }

    const userId = (req as any).user.id;

    const robot = await Robot.findOneAndUpdate(
      { id: req.params.id, userId },
      { $set: { status: req.body } },
      { new: true }
    );

    if (!robot) {
        next(errorHandler(404, "Robot not found or unauthorized"));
      return 
    }

    return res.json({
      message: "Status updated",
      robot,
    });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const getAllRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const robots = await Robot.find({ userId });

    return res.json(robots);
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};


export const getRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const robot = await Robot.findOne({
      id: req.params.id,
      userId,
    });

    if (!robot) {
      return next(errorHandler(404, "Robot not found or unauthorized"));
    }

    return res.json(robot);
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

