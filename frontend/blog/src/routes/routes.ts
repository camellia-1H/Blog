import { lazy } from "react";
import { config } from "../config";

// Layouts
// import { HeaderOnly } from "~/layouts";

// Pages
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Upload = lazy(() => import("../pages/Upload"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
  { path: config.routes.post, component: PostDetail },
  { path: "*", component: NotFound },
];

const privateRoutes = [
  { path: config.routes.profile, component: Profile },
  { path: config.routes.upload, component: Upload },
];

export { publicRoutes, privateRoutes };
