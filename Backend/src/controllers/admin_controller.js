import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user_schema.js";
import { Doctor } from "../models/doctor_schema.js";

const getAllDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res
      .status(200)
      .json(new ApiResponse(200, "Doctors data fetched successfully", doctors));
  } catch (error) {
    throw new ApiError(505, "Error while fetching doctors data", error);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res
      .status(200)
      .json(new ApiResponse(200, "Users data fetched successfully", users));
  } catch (error) {
    throw new ApiError(505, "Error while fetching users data", error);
  }
});

const changeAccountStatus = asyncHandler(async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status }).select(
      "-password"
    );

    const user = await User.findById(doctor.userId);
    const notification = user.notification;
    notification.push({
      type: `apply-doctor-request-${status}`,
      message: `Your doctor request as a ${doctor.specializationOn} has been ${status}`,
      data: {
        onClickPath: "/notifications",
      },
    });
    await User.findByIdAndUpdate(user._id, {
      notification,
      isDoctor: status === "approved",
    });

    res
      .status(201)
      .json(new ApiResponse(201, `Doctor Account has been ${status}`, doctor));
  } catch (error) {
    res.send(505, "error while changing account status", error);
  }
});

export { getAllDoctors, getAllUsers, changeAccountStatus };
