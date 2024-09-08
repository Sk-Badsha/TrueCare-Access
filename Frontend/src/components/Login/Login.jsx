import React from "react";
import { Form, Input, Flex, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
const App = () => {
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/users/login", values);
      console.log("Response: ", res);

      if (res.data.success) {
        message.success(res.data.message || "Login successful!");
      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log("error: ", error);

      if (error.response && error.response.data) {
        // If it's an ApiError from the server, show the server message
        message.error(error.response.data.message || "Something went wrong");
      } else {
        // If it's some other kind of error, display a generic message
        message.error("Network error or server is down");
      }
    }
  };
  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onfinishHandler} className="form-main">
        <h3 className="text-center">Login Now</h3>
        <Form.Item label="Email" name="email">
          <Input type="email" required></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required></Input>
        </Form.Item>
        <Flex justify="space-between" align="center">
          <button className="btn btn-success">Login</button>
          <Link to="/register">Register Now!</Link>
        </Flex>
      </Form>
    </div>
  );
};
export default App;
