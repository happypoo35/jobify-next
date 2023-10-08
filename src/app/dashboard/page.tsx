import Link from "next/link";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { getSession } from "@/lib/session";
import { localeDate } from "@/utils/localeDate";
import prisma from "@/prisma/db";
import Chart from "./Chart";

import styles from "./page.module.scss";

const Stats = async () => {
  const session = await getSession();
  const stats = await prisma.job.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
    where: { userId: session?.id },
  });

  const monthlyApplications: { month: string; count: number }[] =
    await prisma.$queryRaw`SELECT TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YYYY') AS month, COUNT(*)::INT AS count FROM "Job" WHERE "userId"=${session?.id} GROUP BY DATE_TRUNC('month', "createdAt") ORDER BY DATE_TRUNC('month', "createdAt")DESC LIMIT(12)`;

  const statsData = stats.reduce((acc: Record<string, number>, v) => {
    acc[v.status] = v._count.status;
    return acc;
  }, {});

  const monthlyApplicationsData =
    monthlyApplications.length > 0
      ? monthlyApplications.reverse()
      : [{ month: localeDate(new Date(), { day: undefined }), count: 0 }];

  const data = [
    {
      count: statsData.pending || 0,
      url: "jobs?status=pending",
      title: "pending applications",
      icon: <FaSuitcaseRolling />,
      color: "hsl(42, 78%, 60%)",
      bg: "hsl(45, 90%, 88%)",
    },
    {
      count: statsData.interview || 0,
      url: "jobs?status=interview",
      title: "interviews scheduled",
      icon: <FaCalendarCheck />,
      color: "hsl(227, 50%, 59%)",
      bg: "hsl(221, 68%, 93%)",
    },
    {
      count: statsData.declined || 0,
      url: "jobs?status=declined",
      title: "jobs declined",
      icon: <FaBug />,
      color: "hsl(0, 57%, 63%)",
      bg: "hsl(0, 100%, 97%)",
    },
  ];

  return (
    <section className={styles.container}>
      <section className={styles.cards}>
        {data.map((el, id) => (
          <Link href={`dashboard/${el.url}`} key={id}>
            <article
              key={id}
              className={styles.card}
              style={{ borderColor: el.color }}
            >
              <header>
                <span className={styles.count} style={{ color: el.color }}>
                  {el.count}
                </span>
                <span
                  className={styles.icon}
                  style={{ color: el.color, background: el.bg }}
                >
                  {el.icon}
                </span>
              </header>
              <h2 data-h5>{el.title}</h2>
            </article>
          </Link>
        ))}
      </section>
      <section className={styles.chart}>
        <header>
          <h3 data-h4>Monthly applications</h3>
          <p>Job applications in last 12 months</p>
        </header>
        <Chart data={monthlyApplicationsData} />
      </section>
    </section>
  );
};

export default Stats;
