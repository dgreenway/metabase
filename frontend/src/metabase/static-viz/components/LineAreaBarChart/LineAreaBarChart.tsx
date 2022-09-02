import { ColorGetter } from "metabase/static-viz/lib/colors";
import React from "react";
import { XYChart } from "../XYChart";
import { ChartSettings, ChartStyle, Series } from "../XYChart/types";
import { Colors } from "./types";

interface LineAreaBarChartProps {
  series: Series[];
  settings: ChartSettings;
  colors: Colors;
  getColor: ColorGetter;
}

const LineAreaBarChart = ({
  series,
  settings,
  getColor,
}: LineAreaBarChartProps) => {
  const chartStyle: ChartStyle = {
    fontFamily: "Lato, sans-serif",
    axes: {
      color: getColor("text-light"),
      ticks: {
        color: getColor("text-medium"),
        fontSize: 11,
      },
      labels: {
        color: getColor("text-medium"),
        fontSize: 11,
        fontWeight: 700,
      },
    },
    legend: {
      fontSize: 13,
      lineHeight: 16,
    },
    value: {
      color: getColor("text-dark"),
      fontSize: 11,
      fontWeight: 800,
      stroke: getColor("white"),
      strokeWidth: 3,
    },
    goalColor: getColor("text-medium"),
  };

  return <XYChart series={series} settings={settings} style={chartStyle} />;
};

export default LineAreaBarChart;
