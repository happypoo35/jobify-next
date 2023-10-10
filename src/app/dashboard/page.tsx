import { Suspense } from "react";
import Stats, { StatsSkeleton } from "./Stats";
import ChartContainer from "./ChartContainer";
import Chart from "./Chart";

import styles from "./page.module.scss";

const StatsPage = () => {
  return (
    <section className={styles.container}>
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
      <section className={styles.chart}>
        <header>
          <h3 data-h4>Monthly applications</h3>
          <p>Job applications in last 12 months</p>
        </header>
        <Suspense fallback={<Chart data={[]} />}>
          <ChartContainer />
        </Suspense>
      </section>
    </section>
  );
};

export default StatsPage;
