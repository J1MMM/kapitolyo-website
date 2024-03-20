import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const aData = [10, 10, 12, 5, 9];
const bData = [5, 20, 3, 25, 20];
const cData = [0, 9, 1, 4, 2];
const xLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function LineGraph() {
  return (
    <LineChart
      width={920}
      height={400}
      series={[
        { data: aData, label: "Added", color: "#1a237e" },
        { data: bData, label: "Renewed", color: "#59A14F" },
        { data: cData, label: "Revoked", color: "#E15759" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
    />
  );
}
