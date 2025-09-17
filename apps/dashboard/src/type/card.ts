// 指标
export interface MetricsCardInfo {
  key: string;
  title: string;
  value: string;
  sub: string;
}

// 上游
export interface UpstreamCardInfo {
  url: string;
  alive: boolean;
  conns: number;
}

// 统计
export interface StatisticsCardInfo {
  total: number;
  blocked: number;
  allowRate: string;
}

// 规则
export interface RulesCardInfo {
  blackList: number;
  whiteList: number;
  tld: number;
  keys: number;
}

// 直方图
export type BarChartPropType = "delay";

export const BarChartCategory: Record<BarChartPropType, string[]> = {
  delay: ["<0.1", "0.1-0.2", "0.2-0.5", "0.5-1", "1-5", ">5"],
};

export const BarChartCategoryIntervals: Record<BarChartPropType, number[]> = {
  delay: [0.1, 0.2, 0.5, 1, 5],
};

export interface BarChartData {
  name: string;
  value: number;
}

export interface SoredTopNRes {
  sortedKeys: string[];
  sortedValues: number[];
}

// 饼图
export const BlockedReason: string[] = ["黑名单", "TLD", "关键词"];

export interface PieChartData {
  name: string;
  value: number;
}

// 日志
export interface LogCardInfo {
  time: string;
  proxy: string;
  method: string;
  client: string;
  target: string;
  sum: number;
  status: number;
  blockReason: string;
}

export const ProxyReqStatus: Record<string, string> = {
  OK: "200",
  BLOCKED: "403",
  ERROR: "500",
};

// 色盘
export type ColorTheme = "light" | "dark";

export interface ColorStyle {
  barFrom: string;
  barTo: string;
  label: string;
  axis: string;
  tick: boolean;
  grid: string; // 分隔线
  tooltipBg: string;
  tooltipText: string;
  shadow: string;
  shadowEmph: string;
}

export const Palette: Record<ColorTheme, ColorStyle> = {
  light: {
    barFrom: "#3b82f6", // 蓝
    barTo: "#06b6d4", // 青绿
    label: "#334155",
    axis: "#cbd5e1",
    tick: false,
    grid: "#e2e8f0", // 分隔线
    tooltipBg: "rgba(15,23,42,0.9)",
    tooltipText: "#e5e7eb",
    shadow: "rgba(0,0,0,0.12)",
    shadowEmph: "rgba(0,0,0,0.22)",
  },
  dark: {
    barFrom: "#f59e0b", // 橙（在黑底上更亮）
    barTo: "#10b981", // 青绿
    label: "#e5e7eb",
    axis: "#64748b",
    tick: false,
    grid: "rgba(148,163,184,0.25)", // 略浅的分隔线
    tooltipBg: "rgba(30,41,59,0.95)",
    tooltipText: "#f8fafc",
    shadow: "rgba(0,0,0,0.35)",
    shadowEmph: "rgba(0,0,0,0.5)",
  },
};
