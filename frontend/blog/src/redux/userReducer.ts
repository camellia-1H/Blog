import { createSlice } from "@reduxjs/toolkit";

import { User } from "../models/User";

const initialState = {
  user: {} as User,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => initialState,
    userLogin : (state, action) => {
      state.user = action.payload
    }
  },
});

export const { logOut, userLogin } = userSlice.actions;
export default userSlice.reducer;
