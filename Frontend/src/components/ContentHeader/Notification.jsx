import React from "react";
import { Container } from "../index.js";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice.js";
import { updateUser } from "../../redux/features/authSlice.js";
import axios from "axios";

function Notification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  // Function to mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        // Changed to POST request
        "/api/v1/users/get-all-notifications",
        { userId: user._id }, // Sending userId in request body
        { withCredentials: true }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(updateUser(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  // Function to delete all read notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        // Changed to POST request
        "/api/v1/users/delete-all-notifications",
        { userId: user._id }, // Sending userId in request body
        { withCredentials: true }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(updateUser(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  return (
    <Container>
      <p className="m-3 text-center fs-2 fw-bold">Notification Page</p>
      <Tabs className="border border-1 border-primary">
        <Tabs.TabPane tab="unread" key={0}>
          <div className="d-flex justify-content-end">
            <p
              className="fs-5 link-primary text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              Mark all Read
            </p>
          </div>
          {user?.notification?.map((msg) => (
            <div
              className="card"
              key={msg.data.doctorID}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card-text"
                onClick={() => navigate(msg.data.onClickPath)}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="read" key={1}>
          <div className="d-flex justify-content-end">
            <p
              className="fs-5 text-danger link-danger"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete all Read
            </p>
          </div>
          {user?.seenNotification?.map((msg) => (
            <div
              className="card"
              key={msg.data.doctorID}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card-text"
                onClick={() => navigate(msg.data.onClickPath)}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
}

export default Notification;
