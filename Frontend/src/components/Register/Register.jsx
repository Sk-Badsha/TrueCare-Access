import React from "react";
import { Flex, Form, Input } from "antd";
import "../../styles/RegisterStyles.css";
import { Link } from "react-router-dom";
function Register() {
  // form handler
  const onfinishHandler = (values) => {
    console.log(values);
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Register Now</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required></Input>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required></Input>
        </Form.Item>
        <Flex justify="space-between" align="center">
          <button className="btn btn-primary">Submit</button>
          <Link to="/login">Already Have an Account?</Link>
        </Flex>
      </Form>
    </div>
  );
}

export default Register;
