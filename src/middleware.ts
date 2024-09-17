import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value.slice(1, -1);

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verifyToken`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const isAdmin = data?.user?.isAdmin;

      const protectedRoutes = ["/in/users/list", "/in/company"];
      const currentRoute = request.nextUrl.pathname;

      const isProtectedRoute = protectedRoutes.some((route) =>
        currentRoute.startsWith(route)
      );

      const isInvoicesList = currentRoute === "/in/invoices/list";

      const isUsersMe = currentRoute === "/in/users/me";

      /*  console.log("Ruta actual:", currentRoute);
      console.log("isAdmin:", isAdmin);
      console.log("Es ruta protegida:", isProtectedRoute);
      console.log("Es invoices list:", isInvoicesList);
      console.log("Es users me:", isUsersMe); */

      if (!isAdmin && (isProtectedRoute || isInvoicesList)) {
        return NextResponse.redirect(new URL("/in", request.url));
      }

      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/in", request.url));
    }
  } catch (error) {
    console.error("Error en el middleware:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/in/:path*"],
};
