import { unsealData } from "iron-session/edge";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "./lib/session";

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const encryptedSession = req.cookies.get("session")?.value;

  const session = encryptedSession
    ? await unsealData<Session>(encryptedSession, {
        password: process.env.SESSION_SECRET!,
      })
    : null;

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
