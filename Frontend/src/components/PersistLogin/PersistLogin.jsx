import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../../customHook/useRefreshToken";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { logout } from "../../redux/features/authSlice";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const location = useLocation();
  const from = location?.pathname || "/dashboard";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  const accessToken = localStorage.getItem("accessToken");
  const { loading } = useSelector((state) => state.alerts);

  const [isRefreshing, setIsRefreshing] = useState(false); // Track if refresh is in progress

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setIsRefreshing(true); // Set refreshing state to true
        dispatch(showLoading()); // Show loading spinner while refreshing
        await refresh(); // Attempt to refresh the token

        // After successful refresh, redirect to the original location
        if (from !== "/login") {
          navigate(from, { replace: true }); // Redirect to the original location
        }
      } catch (err) {
        console.error("Error during token refresh:", err);
        dispatch(logout()); // Log out the user if token refresh fails
        navigate("/login"); // Redirect to login page
      } finally {
        setIsRefreshing(false); // Set refreshing state to false
        dispatch(hideLoading()); // Hide the loading spinner after refresh attempt
      }
    };

    // If user is not authenticated and has an access token, try to refresh
    if (!authStatus && accessToken && !isRefreshing) {
      verifyRefreshToken(); // Attempt to refresh the token
    }

    // If the user is logged out (no accessToken), redirect to login
    if (!accessToken && !isRefreshing) {
      dispatch(logout()); // Dispatch the logout action to clear the auth state
      navigate("/login"); // Redirect to login page
    }
  }, [authStatus, accessToken, from]);
  return <>{<Outlet />}</>;
};

export default PersistLogin;
