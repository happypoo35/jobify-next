import Chart from "./Chart";
import { StatsSkeleton } from "./Stats";

import styles from "./page.module.scss";

const loading = () => {
  return (
    <section className={styles.container}>
      <StatsSkeleton />
      <section className={styles.chart}>
        <header>
          <h3 data-h4>Monthly applications</h3>
          <p>Job applications in last 12 months</p>
        </header>
        <Chart data={[]} />
      </section>
    </section>
  );
};

export default loading;
