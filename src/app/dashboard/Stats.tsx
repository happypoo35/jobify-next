import Link from "next/link";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { getSession } from "@/lib/session";
import prisma from "@/prisma/db";
import Spinner from "@/assets/spinner.svg";

import styles from "./stats.module.scss";

const data = [
  {
    name: "pending",
    title: "pending applications",
    icon: <FaSuitcaseRolling />,
    color: "hsl(42, 78%, 60%)",
    bg: "hsl(45, 90%, 88%)",
  },
  {
    name: "interview",
    title: "interviews scheduled",
    icon: <FaCalendarCheck />,
    color: "hsl(227, 50%, 59%)",
    bg: "hsl(221, 68%, 93%)",
  },
  {
    name: "declined",
    title: "jobs declined",
    icon: <FaBug />,
    color: "hsl(0, 57%, 63%)",
    bg: "hsl(0, 100%, 97%)",
  },
] as const;

const Stats = async () => {
  const session = await getSession();
  const stats = await prisma.job.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
    where: { userId: session?.id },
  });

  const statsData = stats.reduce((acc: Record<string, number>, v) => {
    acc[v.status] = v._count.status;
    return acc;
  }, {});

  return (
    <section className={styles.cards}>
      {data.map((el, id) => (
        <Link href={`dashboard/jobs?status=${el.name}`} key={id}>
          <article
            key={id}
            className={styles.card}
            style={{ borderColor: el.color }}
          >
            <header>
              <span className={styles.count} style={{ color: el.color }}>
                {statsData[el.name] || 0}
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
  );
};

export const StatsSkeleton = () => {
  return (
    <section className={styles.cards}>
      {data.map((el, id) => (
        <Link href={`dashboard/jobs?status=${el.name}`} key={id}>
          <article
            key={id}
            className={styles.card}
            style={{ borderColor: el.color }}
          >
            <header>
              <span className={styles.count} style={{ color: el.color }}>
                <Spinner />
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
  );
};

export default Stats;
