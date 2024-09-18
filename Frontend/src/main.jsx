import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import {
  Home,
  About,
  AuthInput,
  Dashboard,
  UpdateUser,
  Notification,
} from "./components/index.js";
import { Register, Login, AddDoctor, Doctors, Users } from "./pages/index.js";
import Layout from "./Layout.jsx";
import store, { persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import React from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <AuthInput authentication={false}>
              <Home />
            </AuthInput>
          }
        />
        <Route
          path="about"
          element={
            <AuthInput authentication={false}>
              <About />
            </AuthInput>
          }
        />
        <Route
          path="register"
          element={
            <AuthInput authentication={false}>
              <Register />
            </AuthInput>
          }
        />
        <Route
          path="login"
          element={
            <AuthInput authentication={false}>
              <Login />
            </AuthInput>
          }
        />
        <Route
          path="dashboard"
          element={
            <AuthInput authentication>
              <Dashboard />
            </AuthInput>
          }
        />
        <Route
          path="/update-user"
          element={
            <AuthInput authentication>
              <UpdateUser />
            </AuthInput>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <AuthInput authentication>
              <AddDoctor />
            </AuthInput>
          }
        />

        <Route
          path="/notification"
          element={
            <AuthInput authentication>
              <Notification />
            </AuthInput>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AuthInput authentication>
              <Doctors />
            </AuthInput>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <AuthInput authentication>
              <Users />
            </AuthInput>
          }
        />
      </Route>
    </>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
