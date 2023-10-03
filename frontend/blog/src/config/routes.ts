export const routes = {
  home: "/",
  profile: "/@:nickname",
  profileLink: (nickname : string) => `/@${nickname}`,
  upload: "/upload",
  search: "/search",
  login: "/login",
  register: "/register",
  post: "/@:nickname/post/:id",
  // postLink: (post : string) => `/@${post.user.nickname}/videos/${content.id}`,
  // comment: "/videos/:id/comments",
};
