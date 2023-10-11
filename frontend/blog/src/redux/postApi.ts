import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../models/Post";
import { RootState } from "./store";

export const postApi = createApi({
  reducerPath: "postApi", // ten field trong redux state
  tagTypes: ["Posts", "post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).user.user.accessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
        // headers.set('content-type','application/json; charset=utf-8')
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    getAllPost: build.query<Post[], void>({
      query: () => `post`,
      providesTags: ["Posts"],
      keepUnusedDataFor : 5000
    }),
    getPostById: build.query<Post, string>({
      query: (postid) => `post/${postid}`,
      providesTags: ["post"],
    }),
    getPostByUserId: build.query<Post[], string>({
      query: (userid) => `user/${userid}/post`,
    }),
    // createPost: build.mutation<Post, Partial<Post>>({
    createPost: build.mutation({
      query: (data) => ({
        url: "post/upload",
        method: "POST",
        body: data, // body tự convert sang json
        // headers: { Authorization: `Bearer ${accessToken}` },
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: build.mutation({
      query: ({ userid, postid, ...data }) => ({
        url: `user/${userid}/post/${postid}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetPostByIdQuery,
  useGetPostByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postApi;
