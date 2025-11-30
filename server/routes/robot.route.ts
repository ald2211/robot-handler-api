

import { Router } from 'express';
import * as robot from '../controllers/robot.controller';
import { authenticate } from '../middlewares/auth';



const router = Router();
router.post("/",authenticate, robot.createRobot);
router.patch("/:id/status",authenticate, robot.updateRobotStatus);
router.get("/",authenticate, robot.getAllRobots);
router.get("/:id", authenticate, robot.getRobotById);


export default router;