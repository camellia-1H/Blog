import { Post } from "../models/Post";

import moment from "moment";

export const convertTime = (post: Post) => {
  const time = moment(
    post?.createAt != post?.updateAt ? post?.updateAt : post?.createAt
  ).format("h:mm a, MMMM Do YYYY");
  return time;
};
