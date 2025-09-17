import type { AxiosResponse } from "axios";
import axios from "axios";
import type { response_VO } from "@/api/generated";
import { OpenAPI } from "@/api/generated";

export function setupOpenApi(apiBaseUrl: string) {
  OpenAPI.BASE = apiBaseUrl;
}

export function setupAxiosInterceptors() {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      const responseVo: response_VO = response.data;
      if (responseVo && responseVo.code === 200) {
        return response;
      } else {
        return Promise.reject(new Error(responseVo.message || "Error"));
      }
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        console.error(status, data?.message);
      }
      return Promise.reject(error);
    },
  );
}
