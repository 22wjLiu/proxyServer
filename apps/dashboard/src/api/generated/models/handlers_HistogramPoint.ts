/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type handlers_HistogramPoint = {
  /**
   * 上界 -> 累计计数
   */
  buckets?: Record<string, number>;
  count?: number;
  labels?: Record<string, string>;
  sum?: number;
};
