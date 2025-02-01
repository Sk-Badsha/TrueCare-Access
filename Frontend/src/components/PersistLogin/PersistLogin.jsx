import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../customHook/useRefreshToken";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();
  const location = useLocation();
  const from = location?.pathname;
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        dispatch(showLoading());
        await refresh();
      } catch (err) {
        console.error("Error during token refresh:", err);
      } finally {
        setIsLoading(false);
        dispatch(hideLoading());
      }
    };

    // Refresh token if user is not authenticated
    if (!authStatus && from != "/login" && accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [authStatus, refresh]);

  return <>{<Outlet />}</>;
};

export default PersistLogin;
