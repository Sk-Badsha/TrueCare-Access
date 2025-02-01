import React from "react";
import { DatePicker, TimePicker } from "antd";

const DateTimePicker = ({ onDateChange, onTimeChange }) => {
  return (
    <div>
      <DatePicker
        className="w-100 my-2"
        format="DD-MM-YYYY"
        onChange={(value) => onDateChange(value.format("DD-MM-YYYY"))}
      />
      <TimePicker
        className="w-100 my-2"
        format="HH:mm"
        onChange={(value) => onTimeChange(value ? value.format("HH:mm") : null)}
      />
    </div>
  );
};

export default DateTimePicker;
