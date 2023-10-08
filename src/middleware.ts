import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/session";

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const session = await getSessionFromRequest(req);
  const isException = ["/", "/login", "/register"].some((el) => path === el);

  if (!session?.id) {
    if (isException) return;
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isException) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
};

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
