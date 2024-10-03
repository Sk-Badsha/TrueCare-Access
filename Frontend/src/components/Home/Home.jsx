import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container } from "../index.js";
function Home() {
  const [user, setUser] = useState("");
  const temp = useSelector((state) => state.auth?.userData?.name);
  // logged in user data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/users/getCurrentUser", {
        withCredentials: true,
      });
      const userData = res.data.data;
      //todo
      console.log(userData.name);

      setUser(userData?.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <h1>True Care Access</h1>
      {temp && <p>Welcome {temp}</p>}
    </Container>
  );
}

export default Home;
