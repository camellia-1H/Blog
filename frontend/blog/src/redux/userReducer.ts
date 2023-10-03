import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../models/User";
import { axiosJWT } from "../service/axiosInstace";
import { config } from "../config";

const initialState = {
  user: {} as User,
  accessToken: "" as any,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.accessToken = action.payload?.accessToken;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.user = {} as User;
      state.accessToken = action.payload;
    });
  },
});

export const userLogin = createAsyncThunk(
  config.authApi.login,
  async (data: Partial<User>) => {
    try {
      const res = await axios.post("http://localhost:8080/auth/login", data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const userLogout = createAsyncThunk(
  config.authApi.logout,
  async (accessToken: string) => {
    try {
      const res = await axiosJWT.post("http://localhost:8080/auth/logout", {
        Headers: { Authorizaiton: `Bearer ${accessToken}` },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export default userSlice.reducer;
