import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),       // index route
  route("login", "routes/login.tsx"),    // /login
  route("register", "routes/register.tsx"),  // /register
  route("gallery", "routes/gallery.tsx"),    // /gallery
] satisfies RouteConfig;
