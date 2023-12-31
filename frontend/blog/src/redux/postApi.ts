import { createApi } from "@reduxjs/toolkit/query/react";
import { Post } from "../models/Post";
import customFetchBase from "./customFetchBase";

export const postApi = createApi({
  reducerPath: "postApi", // ten field trong redux state
  tagTypes: ["Posts", "post"],
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    getAllPost: build.query<Post[], void>({
      query: () => ({
        url : 'post',
      }),
      providesTags: ["Posts"],
      keepUnusedDataFor: 5000,
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
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: build.mutation({
      query: ({ userid, postid, ...data }) => ({
        url: `user/${userid}/post/${postid}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["post", "Posts"],
    }),
    deletePost: build.mutation({
      query: ({ userid, postid }) => ({
        url: `user/${userid}/post/${postid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetPostByIdQuery,
  useGetPostByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
