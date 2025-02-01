import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice.js";
import dayjs from "dayjs";

const useBooking = (doctorId, user, doctor) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const handleBookingAvailability = async () => {
    try {
      if (!date || !time) {
        return message.error("Date & Time are required");
      }
      const selectedDate = dayjs(date, "DD-MM-YYYY");
      const currentDate = dayjs();
      if (selectedDate.isBefore(currentDate, "day")) {
        message.error(
          `Invalid Date. Please select a date on or after ${dayjs().format(
            "DD-MM-YYYY"
          )}`
        );
        return;
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/booking-availability",
        {
          doctorId,
          date,
          time,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());

      if (res.data.data === true) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleBooking = async () => {
    if (date < Date.now()) {
      message.error("Invalid Date");
      return;
    }
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/book-appointment",
        {
          doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date,
          userInfo: user,
          time,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      setIsAvailable(false);

      if (res.data?.success) {
        message.success(res.data?.message);
        return true; // Indicate success
      } else {
        message.error(res.data?.message);
        return false; // Indicate failure
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      return false; // Indicate failure
    }
  };

  return {
    date,
    setDate,
    time,
    setTime,
    isAvailable,
    handleBookingAvailability,
    handleBooking,
  };
};

export default useBooking;
