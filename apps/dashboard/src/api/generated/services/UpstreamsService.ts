/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { handlers_NodeStatus } from "../models/handlers_NodeStatus";
import type { response_VO } from "../models/response_VO";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UpstreamsService {
  /**
   * 获取上游池信息
   * 返回上游链接包括链接协议、路径和是否存活等
   * @returns any OK
   * @throws ApiError
   */
  public static getApiUpstreams(): CancelablePromise<
    response_VO & {
      data?: handlers_NodeStatus;
    }
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/upstreams",
      errors: {
        500: `获取上游池信息失败`,
      },
    });
  }
}
