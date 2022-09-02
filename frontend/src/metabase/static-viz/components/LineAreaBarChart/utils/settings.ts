import { getX } from "../../XYChart/utils";
import { Size } from "../types";

import type { ChartSettings, Series, TickDisplay } from "../../XYChart/types";

const DEFAULT_SIZE = {
  width: 540,
  height: 300,
};

const RATIO = DEFAULT_SIZE.width / DEFAULT_SIZE.height;

const MAX_WIDTH = 800;

export const calculateChartSize = (
  settings: ChartSettings,
  xValuesCount: number,
  minTickSize: number,
): Size => {
  if (settings.x.type !== "ordinal") {
    return DEFAULT_SIZE;
  }

  const requiredWidth = minTickSize * xValuesCount;

  const width = Math.max(
    DEFAULT_SIZE.width,
    Math.min(MAX_WIDTH, requiredWidth),
  );
  const height = width / RATIO;

  return {
    width,
    height,
  };
};

export const getXValuesCount = (series: Series[]): number => {
  const items = new Set();
  series.forEach(s => {
    s.data.forEach(datum => items.add(getX(datum)));
  });
  return items.size;
};

interface XAxisProps {
  areXTicksRotated: boolean;
  areXTicksHidden: boolean;
  xTicksCount: number;
  xTickDisplay?: TickDisplay;
}

// We want to adjust display settings based on chart data to achieve better-looking charts on smaller static images.
export const getXAxisProps = (
  settings: ChartSettings,
  xValuesCount: number,
  minTickSize: number,
  chartWidth: number,
): XAxisProps => {
  if (settings.x.type === "ordinal") {
    const xTickDisplay = handleCrowdedOrdinalXTicks(
      settings,
      xValuesCount,
      minTickSize,
      chartWidth,
    );
    const areXTicksHidden = xTickDisplay === "hide";

    return {
      areXTicksRotated: xTickDisplay === "rotate-45",
      areXTicksHidden,
      // xLabelOffset: areXTicksHidden ? -style.axes.ticks.fontSize : undefined,
      xTicksCount: Infinity,
      xTickDisplay,
    };
  }

  const xTickDisplay = settings.x.tick_display;
  const areXTicksHidden = xTickDisplay === "hide";

  return {
    areXTicksRotated: false,
    areXTicksHidden,
    xTicksCount: 4,
    xTickDisplay,
  };
};

export const getXLabelOffset = (
  xTickDisplay: TickDisplay | undefined,
  tickFontSize: number,
  maxTickValueWidth: number,
): number | undefined => {
  if (xTickDisplay === "hide") {
    return -tickFontSize;
  }

  if (xTickDisplay === "rotate-45") {
    return maxTickValueWidth;
  }
};

const handleCrowdedOrdinalXTicks = (
  settings: ChartSettings,
  xValuesCount: number,
  minTickSize: number,
  chartWidth: number,
): TickDisplay | undefined => {
  if (minTickSize * xValuesCount > chartWidth) {
    return "hide";
  }

  if (xValuesCount > 10) {
    return "rotate-45";
  }

  return settings.x.tick_display;
};
