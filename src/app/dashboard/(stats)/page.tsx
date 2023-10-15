import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Stats, { StatsSkeleton } from "./Stats";
import ChartContainer from "./ChartContainer";

import styles from "./page.module.scss";
import { Suspense } from "react";
import Chart from "./Chart";

const StatsPage = async () => {
  const session = await getSession();

  if (!session) redirect("/");

  return (
    <section className={styles.container}>
      <Suspense fallback={<StatsSkeleton />}>
        <Stats session={session} />
      </Suspense>
      <section className={styles.chart}>
        <header>
          <h3 data-h4>Monthly applications</h3>
          <p>Job applications in last 12 months</p>
        </header>
        <Suspense fallback={<Chart data={[]} />}>
          <ChartContainer session={session} />
        </Suspense>
      </section>
    </section>
  );
};

export default StatsPage;
