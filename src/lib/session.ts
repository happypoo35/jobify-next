// import { unsealData as usealDataEdge } from "iron-session/edge";
import { sealData, unsealData } from "iron-session";
import { cookies } from "next/headers";
import { cache } from "react";
import { NextRequest } from "next/server";

const COOKIE_NAME = "session";

export type Session = {
  id: string;
  email: string;
  firstName: string;
  lastName?: string | null;
  location?: string | null;
};

export const createSession = async (data: Session) => {
  const encryptedSession = await sealData(data, {
    password: process.env.SESSION_SECRET!,
  });

  cookies().set(COOKIE_NAME, encryptedSession, {
    secure: process.env.NODE_ENV === "production",
  });

  return null;
};

export const getSession = cache(async () => {
  const encryptedSession = cookies().get(COOKIE_NAME)?.value;
  const session = encryptedSession
    ? await unsealData<Session>(encryptedSession, {
        password: process.env.SESSION_SECRET!,
      })
    : null;

  return session;
});

export const getSessionFromRequest = async (req: NextRequest) => {
  const encryptedSession = req.cookies.get(COOKIE_NAME)?.value;

  const session = encryptedSession
    ? await unsealData<Session>(encryptedSession, {
        password: process.env.SESSION_SECRET!,
      })
    : null;

  return session;
};

export const destroySession = () => {
  cookies().delete(COOKIE_NAME);
};
