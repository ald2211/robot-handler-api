

import { Router } from 'express';
import * as logs from '../controllers/log.controller';
import { authenticate } from '../middlewares/auth';



const router = Router();
router.post("/",authenticate, logs.createLog);
router.get("/:id",authenticate, logs.getLogsByRobot);



export default router;