export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/auth/signup",
    // "/students/:path*",
    // "/teachers/:path*",
    // "/departments/:path*",
  ],
};
