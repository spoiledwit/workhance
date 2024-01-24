import {
    createLaunch,
    getLaunches
} from "../controllers/launch.js";
import verifyToken from "../middlewares/verifyToken.js";
import { verifyAdminGeneral } from "../middlewares/verifyAdminGeneral.js";

import { Router } from 'express';

const router = Router();

router.route('/').post(verifyToken, verifyAdminGeneral, createLaunch);
router.route('/').get(verifyToken, getLaunches);

export default router;