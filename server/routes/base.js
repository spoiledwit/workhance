import {
  getBase,
  createBase,
  updateBase,
  deleteBase,
  addMissile,
  getBases,
  getBasesWithMissiles,
  getBaseMissiles,
} from "../controllers/Base.js";

import verifyToken from "../middlewares/verifyToken.js";
import { verifyAdminGeneral } from "../middlewares/verifyAdminGeneral.js";

import { Router } from "express";

const router = Router();

router.get("/withMissiles", getBasesWithMissiles);
router.get(":id/missiles", getBaseMissiles);

router
  .route("/")
  .get(getBases)
  .post(verifyToken, verifyAdminGeneral, createBase);

router
  .route("/:id")
  .get(getBase)
  .put(verifyToken, verifyAdminGeneral, updateBase)
  .delete(verifyToken, verifyAdminGeneral, deleteBase);

router.route("/:id/missiles").post(verifyToken, verifyAdminGeneral,addMissile);

export default router;