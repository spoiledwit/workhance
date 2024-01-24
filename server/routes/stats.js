import {
    getStats,
} from "../controllers/stats.js";

import { Router } from 'express';

const router = Router();

router.route('/')
    .get(getStats)

export default router;