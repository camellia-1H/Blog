import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../models/User";
import { axiosJWT } from "../service/axiosInstace";
import { config } from "../config";

const initialState = {
  user: {} as User,
  // message: "",
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
  extraReducers: (builder) => {
    // login sai nhưng từ pending vẫn chuyển sang fullfill
    // builder.addCase(userLogin.pending, (state, action) => {
    //   state.message = action.payload as any;
    // });
    // builder.addCase(userLogin.fulfilled, (state, action) => {
    //   state.user = action.payload;
    // });
    // builder.addCase(userLogout.fulfilled, (state, action) => {
    //   state.user = {} as User;
    // });
  },
});

export const { logOut, userLogin } = userSlice.actions;

// export const userLogin = createAsyncThunk(
//   config.authApi.login,
//   async (data: Partial<User>) => {
//     try {
//       const res = await axios.post("http://localhost:8080/auth/login", data);
//       return res.data;
//     } catch (e) {
//       if (axios.isAxiosError(e)) {
//         return e.response?.data;
//       }
//     }
//   }
// );

// export const userLogout = createAsyncThunk(
//   config.authApi.logout,
//   async (accessToken: string) => {
//     try {
//       const res = await axiosJWT.post("http://localhost:8080/auth/logout", {
//         Headers: { Authorizaiton: `Bearer ${accessToken}` },
//       });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export default userSlice.reducer;
