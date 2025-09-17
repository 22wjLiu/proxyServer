/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { handlers_MetricsJSON } from "../models/handlers_MetricsJSON";
import type { response_VO } from "../models/response_VO";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class MetricsService {
  /**
   * 获取代理运行指标
   * 返回请求数、延迟、并发等 JSON 格式的指标
   * @returns any OK
   * @throws ApiError
   */
  public static getApiMetrics(): CancelablePromise<
    response_VO & {
      data?: handlers_MetricsJSON;
    }
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/metrics",
      errors: {
        500: `获取指标失败`,
      },
    });
  }
}
