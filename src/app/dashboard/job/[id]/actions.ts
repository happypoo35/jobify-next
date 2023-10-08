"use server";

import { revalidatePath } from "next/cache";
import { JobType, StatusType } from "@prisma/client";
import { z } from "zod";
import prisma from "@/prisma/db";
import { getSession } from "@/lib/session";

export type FormData = {
  company: string;
  position: string;
  status: string;
  jobType: string;
  jobLocation: string;
};

export const updateJob = async ({
  formData,
  jobId,
}: {
  formData: FormData;
  jobId: string;
}) => {
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

  await prisma.job.update({
    where: { id: jobId, userId: user.id },
    data: data.data,
  });

  revalidatePath("/dashboard/jobs");
  revalidatePath(`/dashboard/job/${jobId}`);
  return { success: true };
};
