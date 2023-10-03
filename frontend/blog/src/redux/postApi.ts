import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../models/Post";

export const postApi = createApi({
  reducerPath: "postApi", // ten field trong redux state
  tagTypes : ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders(headers, {getState}) {
      headers.set('authorization', `Bearer abc`)
    },
  }),
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    getAllPost: build.query<Post[], string>({
      query: (userid) => `user/${userid}/post`,
      providesTags : ['Post'],
    }),
    createPost: build.mutation<Post,Partial<Post>>({
      query: (data) => ({
        url : ``,
        method : 'POST',
        body : data
      }),
      invalidatesTags : ["Post"]
    })
  }),
});

export const { useGetAllPostQuery } = postApi;
