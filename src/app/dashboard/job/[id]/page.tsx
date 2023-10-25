import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import prisma from "@/prisma/db";
import UpdateForm from "./UpdateForm";

const select = {
  id: true,
  company: true,
  position: true,
  status: true,
  jobType: true,
  jobLocation: true,
};

const EditJobPage = async ({ params }: { params: { id: string } }) => {
  const jobId = params.id;
  const session = await getSession();
  const job = await prisma.job.findUnique({
    where: { id: jobId, userId: session?.id },
    select,
  });

  if (!job) notFound();

  return <UpdateForm data={job} />;
};

export default EditJobPage;
