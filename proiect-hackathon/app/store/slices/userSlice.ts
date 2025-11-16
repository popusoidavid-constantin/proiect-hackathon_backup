import { User } from "@/app/models/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initalState: User = {
  id: "",
  createdAt: "",
  email: "",
  county: "",
  sirutaCode: 0,
  uatName: "",
};

const userSlice = createSlice({
  name: "userState",
  initialState: initalState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction) => {
      Object.assign(state, action.payload);
    },
    clearUser: () => {
      return initalState;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
