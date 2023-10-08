import { FiNavigation, FiCalendar, FiBriefcase } from "react-icons/fi";
import { Job } from "@prisma/client";
import { localeDate } from "@/utils/localeDate";
import JobCardOptions from "./JobCardOptions";

import styles from "./jobCard.module.scss";

const JobCard = ({ job }: { job: Job }) => {
  return (
    <article className={styles.card}>
      <header>
        <div className={styles.title}>
          <div className={styles.icon}>{job.company.split("")[0]}</div>
          <div className={styles.text}>
            <h2 data-h5 title={job.position}>
              {job.position}
            </h2>
            <p title={job.company}>{job.company}</p>
          </div>
        </div>
        <JobCardOptions key={job.id} jobId={job.id} />
      </header>
      <div className={styles.content}>
        <div className={styles.item}>
          <FiNavigation />
          <span title={job.jobLocation}>{job.jobLocation}</span>
        </div>
        <div className={styles.item}>
          <FiCalendar />
          <span>{localeDate(job.createdAt)}</span>
        </div>
        <div className={styles.item}>
          <FiBriefcase />
          <span>{job.jobType}</span>
        </div>
        <div className={styles.status} data-status={job.status}>
          {job.status}
        </div>
      </div>
    </article>
  );
};

export default JobCard;
