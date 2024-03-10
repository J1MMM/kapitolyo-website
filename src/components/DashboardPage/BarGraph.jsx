import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "total count",
    },
  ],
  width: 650,
  height: 370,

  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {},
  },
};
const dataset = [
  {
    london: 55,
    paris: 90,
    newYork: 20,
    month: "Mon",
  },
  {
    london: 40,
    paris: 70,
    newYork: 30,
    month: "Tue",
  },
  {
    london: 30,
    paris: 53,
    newYork: 23,
    month: "Wed",
  },
  {
    london: 54,
    paris: 70,
    newYork: 11,
    month: "Thu",
  },
  {
    london: 20,
    paris: 69,
    newYork: 7,
    month: "Fri",
  },
  {
    london: 30,
    paris: 63,
    newYork: 19,
    month: "Sat",
  },
  {
    london: 10,
    paris: 60,
    newYork: 8,
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
        { dataKey: "london", label: "Added Clients", valueFormatter },
        { dataKey: "paris", label: "Renewed", valueFormatter },
        { dataKey: "newYork", label: "Revoked", valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
