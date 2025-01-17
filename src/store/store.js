import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import medicineReducer from "./medicineSlice";

var store = configureStore({
  reducer: {
    userInfo: authReducer,
    medicineInfo: medicineReducer,
  },
});

export default store;
