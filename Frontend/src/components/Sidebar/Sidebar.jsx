import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/SidebarStyles.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice.js";
import axios from "axios";
import { adminMenu, userMenu, doctorMenu } from "./Data.js";
import { message } from "antd";
// Navigation Items

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

  console.log(user);

  const [isOpen, setIsOpen] = useState(true);
  let navItems;
  if (user.isAdmin) {
    navItems = adminMenu;
  } else if (user.isDoctor) {
    navItems = doctorMenu;
  } else {
    navItems = userMenu;
  }

  console.log(navItems);

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
