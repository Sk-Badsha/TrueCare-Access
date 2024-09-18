import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user_schema.js";
import { Doctor } from "../models/doctor_schema.js";

import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const acc_token = user.generateAccessToken();
    const ref_token = user.generateRefreshToken();

    user.refreshToken = ref_token;

    await user.save({ validateBeforeSave: false });
    return { acc_token, ref_token };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required");
  }
  if (!email.includes("@")) throw new ApiError(400, "Email is not valid");

  const existedUser = await User.findOne({
    $or: [{ email: req.body.email }],
  });

  if (existedUser) {
    return res
      .status(409)
      .json(new ApiResponse(409, "User with this email already exists", {}));
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  // Select fields to return (excluding sensitive data)
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  // Successful response
  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password)
    throw new ApiError(400, "username or email is required");

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) throw new ApiError(404, "User doesn't exists");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { acc_token, ref_token } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", acc_token, options)
    .cookie("refreshToken", ref_token, options)
    .json(
      new ApiResponse(200, "user logged in successfully", {
        user: loggedInUser,
        acc_token,
        ref_token,
      })
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  if (!currentUser) throw new ApiError(401, "no current user available");

  return res
    .status(200)
    .json(new ApiResponse(200, "successfully got current user", currentUser));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const applyDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.create({
    ...req.body,
    status: "pending",
  });

  if (!doctor) {
    throw new ApiError(404, "Error while creating doctor");
  }

  // Select fields to return (excluding sensitive data)
  const createdDoctor = await Doctor.findById(doctor._id).select("-password");

  if (!createdDoctor) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  const adminUser = await User.findOne({ isAdmin: true });
  const notification = adminUser.notification;
  notification.push({
    type: "apply-doctor-request",
    message: `${createdDoctor.firstName} ${createdDoctor.lastName} has applied for a doctor account`,
    data: {
      doctorID: createdDoctor._id,
      name: createdDoctor.firstName + " " + createdDoctor.lastName,
      onClickPath: "/doctors",
    },
  });

  const response = await User.findByIdAndUpdate(adminUser._id, {
    notification,
  });

  if (!response) {
    await User.findByIdAndDelete(createdDoctor._id);
    throw new ApiError(500, "Something went wrong while applying doctor");
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, "Doctor Account Applied Successfully", createdDoctor)
    );
});

const getAllNotification = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $push: { seenNotification: { $each: user.notification } },
        $set: { notification: [] },
      },
      { new: true } // Return the updated document
    ).select("-password -refreshToken");
    return res
      .status(200)
      .json(
        new ApiResponse(200, "all notification marked as read", updatedUser)
      );
  } catch (error) {
    throw new ApiError(500, "Error in notification", error);
  }
});

const deleteAllNotification = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $set: { notification: [], seenNotification: [] },
      },
      { new: true } // Return the updated document
    ).select("-password -refreshToken");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "all notification deleted successfully",
          updatedUser
        )
      );
  } catch (error) {
    throw new ApiError(500, "Unable to delete all notification", error);
  }
});

export {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
};
