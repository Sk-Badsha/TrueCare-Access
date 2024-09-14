import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/user_controller.js";
import { verifyJWT } from "../middlewares/auth_middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secure route
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
