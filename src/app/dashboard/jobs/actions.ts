"use server";

import { revalidatePath } from "next/cache";
import { JobType, StatusType } from "@prisma/client";
import { getSession } from "@/lib/session";
import prisma from "@/prisma/db";
import jobs from "@/prisma/job.json";

export const deleteJob = async (jobId: string) => {
  await prisma.job.delete({ where: { id: jobId } });
  revalidatePath("/dashboard/jobs");
};

export const seedJob = async () => {
  const session = await getSession();

  if (!session) return { success: false };

  const jobsData = jobs.map((el) => ({
    ...el,
    status: el.status as StatusType,
    jobType: el.jobType as JobType,
    userId: session.id,
  }));

  try {
    await prisma.job.createMany({ data: jobsData });
    revalidatePath("/dashboard/jobs");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};
