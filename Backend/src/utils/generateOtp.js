import { ApiError } from "./ApiError.js";

const generateOtp = (digit) => {
  try {
    const lowerBound = Math.pow(10, digit - 1);
    const upperBound = 9 * Math.pow(10, digit - 1);
    const otp = Math.floor(lowerBound + Math.random() * upperBound);
    const otpExpires = Date.now() + 5 * 60 * 1000;
    return { otp, otpExpires };
  } catch (error) {
    throw new ApiError(
      500,
      "Error while sending OTP, please try after sometime.",
      error
    );
  }
};

export default generateOtp;
