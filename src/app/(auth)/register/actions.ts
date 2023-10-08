"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { JobType, StatusType } from "@prisma/client";
import { createSession } from "@/lib/session";
import prisma from "@/prisma/db";
import jobs from "@/prisma/job.json";

export type FormData = {
  firstName: string;
  email: string;
  password: string;
  addMock?: boolean;
};

export const createUser = async (formData: FormData) => {
  const data = z
    .object({
      firstName: z.string(),
      email: z.string(),
      password: z.string().min(6),
      addMock: z.boolean().optional(),
    })
    .safeParse(formData);

  const jobData = z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        status: z.nativeEnum(StatusType),
        jobType: z.nativeEnum(JobType),
        jobLocation: z.string(),
        createdAt: z.string(),
      })
    )
    .safeParse(jobs);

  if (!data.success) {
    console.log(data.error);
    return { success: false, error: data.error.issues };
  }

  const { addMock, ...userData } = data.data;

  userData.password = await bcrypt.hash(userData.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
        ...(addMock &&
          jobData.success && { jobs: { createMany: { data: jobData.data } } }),
      },
    });

    await createSession({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
    });

    return { success: true, message: `User ${userData.email} created` };
  } catch (err) {
    console.log(err);
    return { success: false, message: "User with this email already exists" };
  }
};
