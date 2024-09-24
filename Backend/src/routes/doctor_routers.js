import { Router } from "express";
import {
  getDoctorInfo,
  getDoctorDetailsByID,
  updateDoctorInfo,
  doctorAppointments,
  changeBookingStatus,
} from "../controllers/doctor_controller.js";
import { verifyJWT } from "../middlewares/auth_middleware.js";
const router = Router();

router.route("/getDoctorInfo").post(verifyJWT, getDoctorInfo);
router.route("/updateDoctorInfo").post(verifyJWT, updateDoctorInfo);
router.route("/getDoctorDetailsByID").post(verifyJWT, getDoctorDetailsByID);
router.route("/doctor-appointments").get(verifyJWT, doctorAppointments);
router.route("/changeBookingStatus").post(verifyJWT, changeBookingStatus);
export default router;
