import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import { logout } from "../redux/features/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axios.get("/api/v1/users/refreshAccessToken", {
        withCredentials: true,
      });
      const { user, acc_token } = response?.data?.data;
      dispatch(login(user)); // Update the auth state with the new user data
      localStorage.setItem("accessToken", acc_token); // Store the new access token
      return acc_token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      dispatch(logout()); // Log out the user if token refresh fails
      localStorage.removeItem("accessToken"); // Remove the invalid access token
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
