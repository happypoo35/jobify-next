"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/lib/session";

export const logout = () => {
  destroySession();
  redirect("/");
};
