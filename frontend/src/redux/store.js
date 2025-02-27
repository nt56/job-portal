import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
  //slices here
  reducer: {
    auth: authSlice,
  },
});

export default store;
