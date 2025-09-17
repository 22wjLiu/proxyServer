/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { handlers_RulesInfo } from "../models/handlers_RulesInfo";
import type { response_VO } from "../models/response_VO";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class RulesService {
  /**
   * 获取当前规则信息
   * 返回当前配置的关键词、TLD、黑名单、白名单信息
   * @returns any OK
   * @throws ApiError
   */
  public static getApiRules(): CancelablePromise<
    response_VO & {
      data?: handlers_RulesInfo;
    }
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/rules",
      errors: {
        500: `获取规则信息失败`,
      },
    });
  }
}
