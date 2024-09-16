import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/SidebarStyles.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice.js";
import axios from "axios";
import { message } from "antd";
// Navigation Items
const userMenu = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    slug: "/dashboard",
  },
  {
    name: "Appointments",
    icon: "fa-solid fa-list-check",
    slug: "/appointments",
  },
  {
    name: "Apply Doctor",
    icon: "fa-solid fa-user-doctor",
    slug: "/apply-doctor",
  },
  {
    name: "Update Profile",
    icon: "fa-regular fa-user",
    slug: "/update-user",
  },
];

const adminMenu = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    slug: "/dashboard",
  },
  {
    name: "Doctors",
    icon: "fa-solid fa-user-doctor",
    slug: "/doctors",
  },
  {
    name: "Users",
    icon: "fa-solid fa-users ",
    slug: "/users",
  },
  {
    name: "Profiles",
    icon: "fa-solid fa-user-tie",
    slug: "/profiles",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      dispatch(logout()); // Clear user data in Redux
      navigate("/login"); // Redirect to login page
      message.success("logout Successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const user = useSelector((state) => state.auth.userData);
  const [isOpen, setIsOpen] = useState(true);
  const navItems = user.isAdmin ? adminMenu : userMenu;

  // Function to handle toggle
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-details">
        <h5 className="logo_name">TRUECARE ACCESS</h5>
        <i
          className={`fa-solid ${isOpen ? "fa-angle-left" : "fa-angle-right"}`}
          id="btn"
          onClick={toggleSidebar}
        ></i>
      </div>

      {/* Navigation Menu */}
      <div className="menu">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                className={({ isActive }) =>
                  ` nav item nav-link ${isActive ? "active" : ""}`
                }
                aria-current="page"
                to={item.slug}
              >
                <i className={item.icon}></i>
                <span className="links_name">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Profile Section */}
      <li className="profile">
        {isOpen && (
          <div className="profile-details">
            <div className="name_job">
              <div className="name">{user.name}</div>
              <div className="job">{user.email}</div>
            </div>
          </div>
        )}
        <i
          className="fa-solid fa-arrow-right-from-bracket"
          id="log_out"
          onClick={handleLogout}
        ></i>
      </li>
    </div>
  );
};

export default Sidebar;
