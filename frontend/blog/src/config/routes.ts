export const routes = {
  home: "/",
  profile: "/:userid",
  profileLink: (userid : string) => `/@${userid}`,
  upload: "/upload",
  search: "/search",
  login: "/login",
  register: "/register",
  post: "/:userid/post/:postid",
  postLink: (userid : string, postid : string) => `/@${userid}/post/${postid}`,
  // comment: "/videos/:id/comments",
};
