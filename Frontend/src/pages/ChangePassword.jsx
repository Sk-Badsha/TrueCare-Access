import React, { useState } from "react";
import { Container } from "../components/index.js";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  message,
  Card,
  Alert,
  Typography,
  Row,
  Col,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

function ChangePassword() {
  const backendUrl = import.meta.env.VITE_BACKEND_ENDPOINT;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  const [form] = Form.useForm();

  const onFinishHandler = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/v1/users/change-Password`,
        values,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        form.resetFields();
        setError("");
      } else {
        setError(res.data.message);
        message.error(res.data.message);
      }
    } catch (error) {
      console.log("error: ", error);
      setError(error.response?.data?.message || "Something went wrong");
      message.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{ background: "#E0FFFF", minHeight: "100vh", padding: "20px" }}
    >
      <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            title={
              <Title
                level={3}
                style={{ textAlign: "center", color: "#008080" }}
              >
                Change Password
              </Title>
            }
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              background: "#FFFFFF",
            }}
          >
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{
                  marginBottom: "20px",
                  background: "#FF6B6B",
                  color: "#FFFFFF",
                }}
              />
            )}
            <Form
              form={form}
              name="change-password"
              layout="vertical"
              onFinish={onFinishHandler}
              onChange={() => setError("")}
            >
              <Form.Item
                label="Name"
                name="name"
                initialValue={user?.name}
                style={{ marginBottom: "16px" }}
              >
                <Input prefix={<UserOutlined />} disabled />
              </Form.Item>

              <Form.Item
                label="Current Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
                style={{ marginBottom: "16px" }}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
                style={{ marginBottom: "16px" }}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{
                    width: "100%",
                    background: "#008080",
                    borderColor: "#008080",
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
