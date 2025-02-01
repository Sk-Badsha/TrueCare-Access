import React from "react";
import { Button } from "antd";
import DateTimePicker from "./DateTimePicker.jsx";
import useBooking from "../customHook/useBooking.js";

const BookingForm = ({ doctorId, user, doctor, onBookingSuccess }) => {
  const {
    date,
    setDate,
    time,
    setTime,
    isAvailable,
    handleBookingAvailability,
    handleBooking,
  } = useBooking(doctorId, user, doctor);

  const handleBookNow = async () => {
    const success = await handleBooking();
    if (success) {
      onBookingSuccess();
    }
  };

  return (
    <div className="booking-form">
      <DateTimePicker onDateChange={setDate} onTimeChange={setTime} />
      <Button
        type="primary"
        block
        onClick={handleBookingAvailability}
        style={{ background: "#008080", borderColor: "#008080" }}
      >
        Check Availability
      </Button>
      {isAvailable && (
        <Button
          type="default"
          block
          className="mt-2"
          onClick={handleBookNow}
          style={{ color: "#008080", borderColor: "#008080" }}
        >
          Book Now
        </Button>
      )}
    </div>
  );
};

export default BookingForm;
