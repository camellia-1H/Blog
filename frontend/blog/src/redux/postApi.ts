import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../models/Post";
import { RootState } from "./store";
// import { useSelector } from "react-redux";
// import { RootState } from "./store";

export const postApi = createApi({
  reducerPath: "postApi", // ten field trong redux state
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).user.user.accessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
        headers.set('content-type','application/json; charset=utf-8')
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    getAllPost: build.query<Post[], void>({
      query: () => `post`,
      providesTags: ["Post"],
    }),
    getPostById: build.query<Post, string>({
      query: (postid) => `post/${postid}`,
    }),
    getPostByUserId: build.query<Post[], string>({
      query: (userid) => `user/${userid}/post`,
    }),
    // createPost: build.mutation<Post, Partial<Post>>({
    createPost: build.mutation({
      query: (data) => ({
        url: "post/upload",
        method: "POST",
        body: JSON.stringify(data),
        // headers: { Authorization: `Bearer ${accessToken}` },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetPostByIdQuery,
  useGetPostByUserIdQuery,
  useCreatePostMutation,
} = postApi;
