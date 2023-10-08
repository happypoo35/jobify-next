"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import styles from "./chart.module.scss";

const Chart = ({ data }: { data: { month: string; count: number }[] }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ResponsiveContainer height={300}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="count" stroke="hsl(185, 62%, 45%)" />
            <CartesianGrid stroke="hsl(210, 31%, 85%)" strokeDasharray="5 5" />
            <XAxis
              stroke="hsl(211, 27%, 70%)"
              dataKey="month"
              tickMargin={10}
            />
            <YAxis
              stroke="hsl(211, 27%, 70%)"
              allowDecimals={false}
            />
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              contentStyle={{
                fontSize: ".75rem",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
