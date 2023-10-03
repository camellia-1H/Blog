import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User";

export const authApi = createApi({
  reducerPath: "authApi", // ten field trong redux state
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    login: build.mutation<User, Partial<User>>({
      query: (data) => ({
        url : `auth/login`,
        method : "POST",
        body : data
      }),
    }),
    register: build.query<User, void>({
      query: () => `auth/register`,
    }),
    logout: build.query<User, void>({
      query: () => `auth/login`,
    }),
   
  }),
});

export const {useLoginMutation} = authApi
