import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index.js";
import { useSelector } from "react-redux";
import { Spinner } from "./components/index.js";
function Route() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {loading && <Spinner />}
    </>
  );
}

export default Route;
