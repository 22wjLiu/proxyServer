import { localRequest } from "@/api/config/request";

function getMetricsCardInfos() {
  return localRequest.get("/mock/metricsCardInfos.json");
}

function getRulesCardInfos() {
  return localRequest.get("/mock/rulesCardInfo.json");
}

function getStatisticsCardInfos() {
  return localRequest.get("/mock/statisticsCardInfo.json");
}

export const dataService = {
  getMetricsCardInfos,
  getRulesCardInfos,
  getStatisticsCardInfos,
};
