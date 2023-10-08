import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import prisma from "@/prisma/db";
import UpdateForm from "./UpdateForm";

const EditJob = async ({ params }: { params: { id: string } }) => {
  const jobId = params.id;
  const user = await getSession();
  const job = await prisma.job.findUnique({
    where: { id: jobId, userId: user?.id },
  });

  if (!job) notFound();

  return <UpdateForm data={job} />;
};

export default EditJob;
