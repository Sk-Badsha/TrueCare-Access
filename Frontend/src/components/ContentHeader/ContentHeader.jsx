import React from "react";
import "../../styles/ContentHeaderStyles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ContentHeader = () => {
  const user = useSelector((state) => state.auth?.userData);
  return (
    <header className="content-header">
      <i className="fa-solid fa-bell"></i>
      <Link to={"/update-user"}>{user.isAdmin ? "ADMIN" : "USER"}</Link>
    </header>
  );
};

export default ContentHeader;
