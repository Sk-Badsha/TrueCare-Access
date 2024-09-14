import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { persistor } from "../../redux/store.js";
import Cookies from "js-cookie";
export default function AuthInput({ children, authentication = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(showLoading());
    if (authentication && authStatus !== authentication) {
      navigate("/login");
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      persistor.purge();
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    dispatch(hideLoading());
  }, [authStatus, authentication, navigate]);

  return <>{children}</>;
}
