import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  applyDoctor,
  getAllNotificationsByID,
  getAllNotification,
  deleteAllNotification,
  getAllDoctors,
  bookAppointment,
  bookingAvailability,
  userAppointments,
} from "../controllers/user_controller.js";
import { verifyJWT } from "../middlewares/auth_middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secure route
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/apply-doctor").post(verifyJWT, applyDoctor);
router
  .route("/getAllNotificationsByID")
  .post(verifyJWT, getAllNotificationsByID);
router.route("/get-all-notifications").post(verifyJWT, getAllNotification);
router
  .route("/delete-all-notifications")
  .post(verifyJWT, deleteAllNotification);
router.route("/getAllDoctors").get(verifyJWT, getAllDoctors);
router.route("/book-appointment").post(verifyJWT, bookAppointment);
router.route("/booking-availability").post(verifyJWT, bookingAvailability);
router.route("/user-appointments").get(verifyJWT, userAppointments);
export default router;
