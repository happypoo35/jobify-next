import { Prisma } from "@prisma/client";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { getSession } from "@/lib/session";
import { SearchParams } from "./page";
import prisma from "@/prisma/db";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import EmptyList from "./EmptyList";

import styles from "./jobsList.module.scss";

const LIMIT = 12;

const select = {
  id: true,
  company: true,
  position: true,
  jobLocation: true,
  jobType: true,
  status: true,
  createdAt: true,
};

const JobsList = async ({ searchParams }: { searchParams: SearchParams }) => {
  // await new Promise((res) => setTimeout(res, 3000));
  const page = Number(searchParams.page || 1);
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
      select,
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

  if (total === 0) return <EmptyList />;

  const nPages = Math.ceil(count / LIMIT);

  const resultsText = (
    <span>
      Showing{" "}
      <b>
        {(page - 1) * LIMIT + 1}-{page * LIMIT < count ? page * LIMIT : count}
      </b>{" "}
      of {count} job{count !== 1 ? "s" : ""} found
    </span>
  );

  return (
    <>
      <span className={styles.count}>
        {count > 0 ? <FiEye /> : <FiEyeOff />}
        {count > 0 ? resultsText : "no jobs to display"}
      </span>
      <section className={styles.list} role="list" id="jobList">
        {jobs.map((el) => (
          <JobCard key={el.id} job={el} />
        ))}
      </section>
      <Pagination
        pageCount={nPages}
        currentPage={Number(searchParams.page || 1)}
      />
    </>
  );
};

export default JobsList;
