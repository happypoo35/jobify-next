import { getSession } from "@/lib/session";
import { localeDate } from "@/utils/localeDate";
import prisma from "@/prisma/db";
import Chart from "./Chart";

const ChartContainer = async () => {
  const session = await getSession();
  const monthlyApplications: { month: string; count: number }[] =
    await prisma.$queryRaw`SELECT TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YYYY') AS month, COUNT(*)::INT AS count FROM "Job" WHERE "userId"=${session?.id} GROUP BY DATE_TRUNC('month', "createdAt") ORDER BY DATE_TRUNC('month', "createdAt")DESC LIMIT(12)`;

  const monthlyApplicationsData =
    monthlyApplications.length > 0
      ? monthlyApplications.reverse()
      : [{ month: localeDate(new Date(), { day: undefined }), count: 0 }];

  return <Chart data={monthlyApplicationsData} />;
};

export default ChartContainer;
