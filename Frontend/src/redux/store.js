import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // or use `sessionStorage` if you prefer
import alertSlice from "./features/alertSlice";
import authSlice from "./features/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAlertReducer = persistReducer(persistConfig, alertSlice);
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    alerts: persistedAlertReducer,
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);
export default store;
