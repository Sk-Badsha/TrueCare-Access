import React from "react";
import { Typography, Row, Col } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  MoneyCollectOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const DoctorDetails = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      <Title level={4} style={{ color: "#008080" }}>
        <UserOutlined /> Dr. {doctor?.firstName} {doctor?.lastName}
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Text strong style={{ color: "#333333" }}>
            <MoneyCollectOutlined style={{ color: "#008080" }} /> Fees: ₹
            {doctor?.feesPerConsultation || "N/A"}
          </Text>
        </Col>
        <Col span={24}>
          <Text strong style={{ color: "#333333" }}>
            <ClockCircleOutlined style={{ color: "#008080" }} /> Timings:{" "}
            {doctor.timings?.start && doctor.timings?.end
              ? `${doctor?.timings?.start} - ${doctor?.timings?.end}`
              : "N/A"}
          </Text>
        </Col>
        <Col span={24}>
          <Text strong style={{ color: "#333333" }}>
            <StarOutlined style={{ color: "#008080" }} /> Specialization:{" "}
            {doctor?.specializationOn || "N/A"}
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorDetails;
