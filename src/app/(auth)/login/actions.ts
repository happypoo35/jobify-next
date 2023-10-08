"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/db";
import { createSession } from "@/lib/session";

export type FormData = {
  email: string;
  password: string;
};

export const login = async (formData: FormData) => {
  const data = z
    .object({
      email: z.string().nonempty(),
      password: z.string().nonempty(),
    })
    .safeParse(formData);

  if (!data.success) {
    console.log(data.error);
    return { success: false, error: data.error.issues };
  }

  const user = await prisma.user.findUnique({
    where: { email: data.data.email },
  });

  if (user) {
    const isPasswordMatch = await bcrypt.compare(
      data.data.password,
      user.password
    );

    if (isPasswordMatch) {
      await createSession({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
      });
      return { success: true, message: `${user.email} logged in` };
    }
  }

  return { success: false, message: "Incorrect email and/or password" };
};
