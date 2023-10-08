"use server";

import { JobType, StatusType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSession } from "@/lib/session";
import prisma from "@/prisma/db";

export type FormData = {
  company: string;
  position: string;
  status: StatusType;
  jobType: JobType;
  jobLocation: string;
};

export const createJob = async (formData: FormData) => {
  const data = z
    .object({
      company: z.string(),
      position: z.string(),
      status: z.nativeEnum(StatusType),
      jobType: z.nativeEnum(JobType),
      jobLocation: z.string(),
    })
    .safeParse(formData);

  if (!data.success) {
    console.log(data.error);
    return { success: false, error: data.error.issues };
  }

  const user = await getSession();

  if (!user) {
    return { success: false, error: "User not found" };
  }

  await prisma.job.create({
    data: {
      ...data.data,
      user: { connect: { id: user.id } },
    },
  });

  revalidatePath("/dashboard/jobs");
  return { success: true };
};
