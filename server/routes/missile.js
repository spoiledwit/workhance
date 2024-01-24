import {
    createMissile,
    deleteMissile,
    getMissile,
    getMissiles,
    updateMissile,
    getAvailableMissiles
} from '../controllers/missile.js';
import verifyToken from '../middlewares/verifyToken.js';
import { verifyAdminGeneral } from '../middlewares/verifyAdminGeneral.js';

import { Router } from 'express';

const router = Router();

router.get("/available", getAvailableMissiles)

router.route('/')
    .get(getMissiles)
    .post(verifyToken, verifyAdminGeneral, createMissile)

router.route('/:id')
    .get(getMissile)
    .patch(verifyToken, verifyAdminGeneral, updateMissile)
    .delete(verifyToken, verifyAdminGeneral, deleteMissile)

export default router;