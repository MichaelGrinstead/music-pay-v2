import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

console.log("authMiddleware");

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up"],
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    console.log(auth.userId, auth.isPublicRoute, req.url);
    if (!auth.userId && !auth.isPublicRoute) {
      console.log("redirecting to sign in");
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }

    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
