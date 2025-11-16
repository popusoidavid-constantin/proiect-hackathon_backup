import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cityReducer from "./slices/citySlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    city: cityReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
