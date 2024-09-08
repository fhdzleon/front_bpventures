import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value.slice(1,-1);

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verifyToken`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.ok) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Error en el middleware:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/in/:path*"], // Definir rutas en las que aplicar el middleware
};
