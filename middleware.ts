// Clerk middleware — protects gated routes and provides auth() to server code.
// When CLERK_SECRET_KEY is missing (e.g. local dev pre-setup), this is a no-op
// and the app falls back to the legacy bcrypt/JWT flow at /login and /signup.
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/admin(.*)",
  "/partner/jobs(.*)",
  "/itar-workspace(.*)",
]);

const clerkConfigured = !!process.env.CLERK_SECRET_KEY;

export default clerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        await auth.protect();
      }
    })
  : function noopMiddleware() {
      // Clerk not configured — pass through. Legacy /login + /signup still work.
    };

export const config = {
  matcher: [
    // Skip Next internals + static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
