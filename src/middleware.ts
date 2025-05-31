import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Define role enum to match the one used in navigation
enum Role {
  superadmin = 'superadmin',
  admin = 'admin'
}

// Define route permissions
const routePermissions = {
  '/': [Role.superadmin, Role.admin],
  '/admin': [Role.superadmin],
  '/penanggung-jawab': [Role.superadmin, Role.admin],
  '/guru-tugas': [Role.superadmin, Role.admin],
  '/calon-guru-tugas': [Role.superadmin, Role.admin],
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|images).*)'], // Hindari file statis
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token;
    const isLoginPage = req.nextUrl.pathname === '/login';
    const path = req.nextUrl.pathname;

    // If user is on login page and already authenticated, redirect to home
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // If user is not authenticated and not on login page, redirect to login
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check role-based access for authenticated users
    if (token && !isLoginPage) {
      const userRole = token.role as Role;
      const allowedRoles = routePermissions[path as keyof typeof routePermissions];

      // If path exists in routePermissions and user's role is not allowed
      if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to home page if unauthorized
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Allow access if all checks pass
    return null;
  },
  {
    callbacks: {
      authorized: () => true, // Auth handled manually
    },
  }
);
