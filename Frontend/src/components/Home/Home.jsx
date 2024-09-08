import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { Spinner } from "../index";

function Home() {
  const [user, setUser] = useState("");
  // logged in user data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/users/getCurrentUser", {
        withCredentials: true,
      });
      const userData = res.data.data;
      //todo
      console.log(userData.name);

      setUser(userData.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <h1>True Care Access</h1>
      {user && <p>Welcome {user}</p>}
    </>
  );
}

export default Home;
