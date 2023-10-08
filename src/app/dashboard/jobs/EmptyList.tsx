import Link from "next/link";
import { seedJob } from "./actions";
import ImgEmpty from "@/assets/no-data.svg";
import SubmitButton from "./SubmitButton";

import styles from "./emptyList.module.scss";

const EmptyList = () => {
  return (
    <section className={styles.section}>
      <ImgEmpty />
      <p>
        You do not have any jobs added yet. You can start by{" "}
        <Link href="/dashboard/job" data-link>
          adding a new job
        </Link>{" "}
        or populate your job list with a mock data.
      </p>
      <form action={seedJob}>
        <SubmitButton />
      </form>
    </section>
  );
};

export default EmptyList;
