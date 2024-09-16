import React, { useEffect } from "react";
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
    // Show loading spinner
    dispatch(showLoading());

    // IIFE for handling authentication checks
    (async () => {
      if (authentication && !authStatus) {
        // If the user is not authenticated and authentication is required
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });

        // Clear persisted state and navigate to the login page
        await persistor.purge();
        navigate("/login");
      } else if (!authentication && authStatus) {
        // If the user is authenticated but the component doesn't require it
        navigate("/");
      }

      // Hide loading spinner
      dispatch(hideLoading());
    })(); // Immediately invoke the async function
  }, [authStatus, authentication, navigate, dispatch]);

  return <>{children}</>;
}
