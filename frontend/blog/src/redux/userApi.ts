import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User";

export const userApi = createApi({
  reducerPath: "userApi", // ten field trong redux state
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
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
