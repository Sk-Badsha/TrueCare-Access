import React from "react";
import { Form, Input, Flex, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { login as authLogin } from "../../redux/features/authSlice";
import "../../styles/loginStyles.css"; // Add a new CSS file for the login page

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/users/login", values);
      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message || "Login successful!");
        dispatch(authLogin(res.data.data.user));

        localStorage.setItem("accessToken", res?.data?.data.acc_token);
        navigate("/dashboard");
      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("error: ", error);

      if (error.response && error.response.data) {
        message.error(error.response.data.message || "Something went wrong");
      } else {
        message.error("Network error or server is down");
      }
    }
  };

  return (
    <div className="login-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="login-form">
        <h3 className="login-form-title">Login Now</h3>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" required className="login-input" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" required className="login-input" />
        </Form.Item>
        <Form.Item>
          <button
            style={{ width: "100%" }}
            className="btn btn-login"
            type="submit"
          >
            Login
          </button>
        </Form.Item>
        <Flex justify="space-between" align="center">
          <Link to="/register" className="login-register-link">
            Register Now!
          </Link>
          <Link to="/users/forgot-password" className="login-forgot-password">
            Forgot Password?
          </Link>
        </Flex>
      </Form>
    </div>
  );
};

export default App;
