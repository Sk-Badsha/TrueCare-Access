import { Router } from "express";
import {
  getAllDoctors,
  getAllUsers,
  changeAccountStatus,
} from "../controllers/admin_controller.js";
import { verifyJWT } from "../middlewares/auth_middleware.js";
const router = Router();

router.route("/getAllDoctors").get(verifyJWT, getAllDoctors);
router.route("/getAllUsers").get(verifyJWT, getAllUsers);

router.route("/changeAccountStatus").post(verifyJWT, changeAccountStatus);

export default router;
