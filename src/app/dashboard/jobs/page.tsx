import { JobType, StatusType } from "@prisma/client";
import JobsList from "./JobsList";
import { Suspense } from "react";
import Spinner from "@/assets/spinner.svg";

import styles from "./page.module.scss";

export type SearchParams = Partial<{
  page: string;
  search: string;
  status: StatusType;
  jobType: JobType;
  sort: string;
}>;

const JobsPage = ({ searchParams }: { searchParams: SearchParams }) => {
  return <JobsList searchParams={searchParams} />;
};

export default JobsPage;
