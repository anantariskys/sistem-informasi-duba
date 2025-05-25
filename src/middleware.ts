import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|images).*)"], // Hindari file statis
};
export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token;
    const isLoginPage = req.nextUrl.pathname === "/login";

    console.log("Token:", token);

    // Jika user sudah login dan mencoba buka /login, arahkan ke dashboard (/)
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Jika user belum login dan bukan sedang di halaman /login, arahkan ke /login
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Selain itu, izinkan akses
    return null;
  },
  {
    callbacks: {
      authorized: () => true, // Auth handled manually
    },
  }
);
