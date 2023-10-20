import { Suspense } from "react";
import Filters from "./Filters";
import Spinner from "@/assets/spinner.svg";

import styles from "./layout.module.scss";

const JobsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.section}>
      <Filters />
      <div className={styles.jobs}>
        <Suspense
          fallback={
            <div className={styles.loader}>
              <Spinner className={styles.spinner} />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </section>
  );
};

export default JobsLayout;
