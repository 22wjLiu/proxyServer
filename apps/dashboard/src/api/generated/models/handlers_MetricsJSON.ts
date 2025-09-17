/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { handlers_HistogramPoint } from "./handlers_HistogramPoint";
import type { handlers_MetricPoint } from "./handlers_MetricPoint";
export type handlers_MetricsJSON = {
  counters?: Record<string, Array<handlers_MetricPoint>>;
  gauges?: Record<string, Array<handlers_MetricPoint>>;
  histograms?: Record<string, Array<handlers_HistogramPoint>>;
};
