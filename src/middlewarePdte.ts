import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  
  const token = request.cookies.get("token")?.value;
  if(!token) return NextResponse.redirect(new URL("/", request.url));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verifyToken`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el header Authorization
          "Content-Type": "application/json",
        },
      }
    );

    if (!token) {
      throw new Error("Token no valido");
    }
    const data = await response.json();

    if (data) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/not-allowed", request.url)); // Redirigir a otra página
    }
  } catch (error) {
    console.error("Error en el middleware:", error);
    return NextResponse.redirect(new URL("/", request.url)); // Redirigir a una página de error
  }
}

export const config = {
  matcher: ["/in:path*"], // Definir rutas en las que aplicar el middleware
};
