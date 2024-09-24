import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import {
  Home,
  About,
  AuthInput,
  Dashboard,
  Notification,
} from "./components/index.js";
import {
  Register,
  Login,
  AddDoctor,
  Profile,
  BookingPage,
  UserAppointments,
  Appointments,
} from "./pages/index.js";
import Doctors, { doctorsLoader } from "./pages/Admin/Doctors.jsx";
import Users, { usersLoader } from "./pages/Admin/Users.jsx";
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
          path="/doctor/update-profile/:id"
          element={
            <AuthInput authentication>
              <Profile />
            </AuthInput>
          }
        />
        <Route
          path="/doctor/book-appointment/:doctorId"
          element={
            <AuthInput authentication>
              <BookingPage />
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
          loader={usersLoader}
          path="/admin/users"
          element={
            <AuthInput authentication>
              <Users />
            </AuthInput>
          }
        />
        <Route
          loader={doctorsLoader}
          path="/admin/doctors"
          element={
            <AuthInput authentication>
              <Doctors />
            </AuthInput>
          }
        />

        <Route
          path="/user/appointments"
          element={
            <AuthInput authentication>
              <UserAppointments />
            </AuthInput>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <AuthInput authentication>
              <Appointments />
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
