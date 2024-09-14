import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { Spinner } from "../index";
import { useSelector } from "react-redux";

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
    <>
      <h1>True Care Access</h1>
      {temp && <p>Welcome {temp}</p>}
    </>
  );
}

export default Home;
