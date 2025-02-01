import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useRefreshToken from "../../customHook/useRefreshToken";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const location = useLocation();
  const from = location?.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  const accessToken = localStorage.getItem("accessToken");
  const { loading } = useSelector((state) => state.alerts);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        dispatch(showLoading()); // Show loading spinner while refreshing
        await refresh(); // Attempt to refresh the token
      } catch (err) {
        console.error("Error during token refresh:", err);
      } finally {
        dispatch(hideLoading()); // Hide the loading spinner after refresh attempt
      }
    };

    // Store the intended location for redirecting later
    const requestedPage = from !== "/login" ? from : "/"; // Avoid infinite redirects to login

    // If the user is not authenticated and has a valid access token, attempt to refresh the token
    if (!authStatus && from !== "/login" && accessToken) {
      verifyRefreshToken();
    }

    // Once refresh is complete (and loading is false), navigate to the requested page
    if (!loading && !authStatus && requestedPage) {
      navigate(requestedPage); // Redirect to the originally requested page
    }
  }, [authStatus, refresh, from, loading, navigate, dispatch]);

  return <>{<Outlet />}</>;
};

export default PersistLogin;
