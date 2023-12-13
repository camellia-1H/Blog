import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User";
import { userLogin, logOut } from "./userReducer";

export const authApi = createApi({
  reducerPath: "authApi", // ten field trong redux state
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    login: build.mutation<User, Partial<User>>({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
        credentials: "include", // quan trọng, có mới có thể lưu cookie vào browser và nó thêm trường cookie vào req,res
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLogin(data));
        } catch (error) {}
      },
    }),
    register: build.mutation<User, Partial<User>>({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: build.mutation<void, string>({
      query: (accessToken) => ({
        url: "auth/logout",
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
