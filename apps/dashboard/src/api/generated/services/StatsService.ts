/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { metrics_StatsResponse } from "../models/metrics_StatsResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class StatsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Get runtime stats
   * @returns metrics_StatsResponse OK
   * @throws ApiError
   */
  public getApiStats(): CancelablePromise<metrics_StatsResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/api/stats",
    });
  }
}
