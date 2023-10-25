"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/prisma/db";
import { createSession, getSession } from "@/lib/session";

export type FormData = {
  firstName: string;
  lastName?: string;
  email: string;
  location?: string;
};

export const updateUser = async (formData: FormData) => {
  const data = z
    .object({
      firstName: z.string(),
      lastName: z.string().optional(),
      email: z.string(),
      location: z.string().optional(),
    })
    .safeParse(formData);

  if (!data.success) {
    console.log(data.error);
    return { success: false, error: data.error.issues };
  }

  const session = await getSession();
  if (!session?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.id },
      data: data.data,
    });

    await createSession({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
    });

    revalidatePath("/dashboard/profile");

    return {
      success: true,
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName || "",
        location: user.location || "",
      },
    };
  } catch (err) {
    return { success: false, error: "User with this email already exists" };
  }
};
