import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuth: true,
};

const authSlice = createSlice({
  name: "authState",
  initialState: initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
