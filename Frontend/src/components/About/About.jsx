import React from "react";
import aboutImage from "../../assets/Images/about-img.svg"; // Use your image path
import teamMember1 from "../../assets/Images/Member_One.jpeg"; // Replace with actual paths
import teamMember2 from "../../assets/Images/Member_Two.jpg";
import teamMember3 from "../../assets/Images/Member_Three.jpg";
import "../../styles/AboutStyles.css";
import TeamMember from "../TeamMember/TeamMember";

const About = () => {
  return (
    <div className="about-page">
      {/* About Us Section */}
      <section className="about-section">
        <h1 className="section-title">
          About <span>Us</span>
        </h1>
        <div className="about-content">
          <div className="about-image">
            <img src={aboutImage} alt="About Us" />
          </div>
          <div className="about-text">
            <h3>Connecting Care, Building Trust</h3>
            <p>
              TrueCare Access is dedicated to revolutionizing healthcare access
              through technology-driven solutions. We streamline doctor-patient
              interactions to provide seamless appointment scheduling, enhancing
              patient experience and reducing administrative overhead.
            </p>
            <p>
              Our mission is to create a system that prioritizes patient care,
              minimizes waiting times, and fosters trust between patients and
              doctors. We are committed to providing reliable, efficient, and
              compassionate healthcare solutions.
            </p>
            <a href="#learn-more" className="btn-primary">
              Learn More
            </a>
          </div>
        </div>
      </section>
      <TeamMember />
    </div>
  );
};

export default About;
