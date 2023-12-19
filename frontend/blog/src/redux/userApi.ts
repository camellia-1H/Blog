import { createApi } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User";
import customFetchBase from "./customFetchBase";

export const userApi = createApi({
  reducerPath: "userApi", // ten field trong redux state
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    
    getProfileUser : build.query<User,string>({
      query : (userid) => ({
        url : `user/${userid}`,
        // credentials :  'include'
      })
    }),
    
  }),
});

export const {useGetProfileUserQuery} = userApi
