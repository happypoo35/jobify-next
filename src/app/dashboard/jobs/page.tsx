import { JobType, Prisma, StatusType } from "@prisma/client";
import { getSession } from "@/lib/session";
import prisma from "@/prisma/db";
import EmptyList from "./EmptyList";
import Pagination from "./Pagination";
import JobCard from "./JobCard";
import Filters from "./Filters";

import styles from "./page.module.scss";

export type SearchParams = {
  page?: string;
  search?: string;
  status?: StatusType;
  jobType?: JobType;
  sort?: string;
};

const LIMIT = 12;

const Jobs = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await getSession();
  const where = {
    userId: session?.id,
    position: {
      contains: searchParams.search,
      mode: Prisma.QueryMode.insensitive,
    },
    status: searchParams.status,
    jobType: searchParams.jobType,
  };
  const [total, count, jobs] = await Promise.all([
    prisma.job.count({ where: { userId: session?.id } }),
    prisma.job.count({
      where,
    }),
    prisma.job.findMany({
      skip: (Number(searchParams.page || 1) - 1) * LIMIT,
      take: LIMIT,
      where,
      orderBy: [
        {
          createdAt: searchParams.sort
            ? searchParams.sort === "oldest"
              ? "asc"
              : undefined
            : "desc",
        },
        {
          position:
            searchParams.sort === "a-z"
              ? "asc"
              : searchParams.sort === "z-a"
              ? "desc"
              : undefined,
        },
      ],
    }),
  ]);

  const nPages = Math.ceil(count / LIMIT);

  if (total === 0) return <EmptyList />;

  return (
    <section className={styles.section}>
      <Filters
        jobsCount={count}
        page={Number(searchParams.page || 1)}
        limit={LIMIT}
      />
      <section className={styles.list} role="list">
        {jobs.map((el) => (
          <JobCard key={el.id} job={el} />
        ))}
      </section>
      <Pagination
        pageCount={nPages}
        currentPage={Number(searchParams.page || 1)}
      />
    </section>
  );
};

export default Jobs;
