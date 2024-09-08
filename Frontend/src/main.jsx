import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import { Home, About, Register, Login, AuthInput } from "./components/index.js";
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
    <Route path="/" element={<Layout />}>
      <Route
        path=""
        element={
          <AuthInput authentication>
            <Home />
          </AuthInput>
        }
      />
      <Route
        path="about"
        element={
          <AuthInput authentication>
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
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
