import React from "react";
import { Form, Input, Flex } from "antd";
import { Link } from "react-router-dom";
const App = () => {
  const onfinishHandler = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form layout="vertical" onFinish={onfinishHandler} className="login-form">
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
  );
};
export default App;
