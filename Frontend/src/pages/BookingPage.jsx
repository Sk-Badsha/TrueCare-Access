import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import DoctorDetails from "./Doctor/DoctorDetails.jsx";
import BookingForm from "./BookingForm.jsx";
import { Container } from "../components/index.js";

const { Title, Text } = Typography;

function BookingPage() {
  const [doctor, setDoctor] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  const getDoctorDetails = async () => {
    try {
      if (params?.doctorId === user?._id) {
        throw new Error(
          "You are again cheating 😂. You can't book your own appointment😂😂"
        );
      }
      const res = await axios.post(
        "/api/v1/doctor/getDoctorDetailsByID",
        {
          doctorId: params.doctorId,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data?.success) {
        setDoctor(res.data.data);
        message.success("Doctor details loaded successfully!");
      } else {
        message.error("Failed to load doctor details.");
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  const handleBookingSuccess = () => {
    message.success("Appointment booked successfully!");
    navigate("/appointments"); // Redirect after successful booking
  };

  return (
    <Container
      style={{ background: "#E0FFFF", minHeight: "100vh", padding: "20px" }}
    >
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            className="booking-card"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              background: "#FFFFFF",
            }}
          >
            <Title
              level={3}
              className="text-center"
              style={{ color: "#008080" }}
            >
              🗓️ Book an Appointment
            </Title>
            <Text
              type="secondary"
              className="text-center"
              style={{
                display: "block",
                marginBottom: "20px",
                color: "#333333",
              }}
            >
              Please select a date and time to book your appointment with the
              doctor.
            </Text>
            <DoctorDetails doctor={doctor} />
            <BookingForm
              doctorId={params.doctorId}
              user={user}
              doctor={doctor}
              onBookingSuccess={handleBookingSuccess}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BookingPage;
