import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "count of clients",
    },
  ],
  width: 900,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      // transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    added: 55,
    renewed: 90,
    revoked: 20,
    month: "Mon",
  },
  {
    added: 40,
    renewed: 70,
    revoked: 30,
    month: "Tue",
  },
  {
    added: 30,
    renewed: 53,
    revoked: 23,
    month: "Wed",
  },
  {
    added: 54,
    renewed: 70,
    revoked: 11,
    month: "Thu",
  },
  {
    added: 20,
    renewed: 69,
    revoked: 7,
    month: "Fri",
  },
  {
    added: 30,
    renewed: 63,
    revoked: 19,
    month: "Sat",
  },
  {
    added: 10,
    renewed: 60,
    revoked: 8,
    month: "Sun",
  },
];

const valueFormatter = (value) => `${value} clients`;

export default function BarGraph() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        {
          dataKey: "added",
          label: "Added Clients",
          valueFormatter,
          color: "#4E79A7",
        },
        {
          dataKey: "renewed",
          label: "Renewed",
          valueFormatter,
          color: "#59A14F",
        },
        {
          dataKey: "revoked",
          label: "Revoked",
          valueFormatter,
          color: "#E15759",
        },
      ]}
      {...chartSetting}
    />
  );
}
