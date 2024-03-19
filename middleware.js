export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/auth/signup",
    "/courses/:path*",
    "/departments/:path*",
    "/semesters/:path*",
    "/students/:path*",
    "/teachers/:path*",
  ],
};
