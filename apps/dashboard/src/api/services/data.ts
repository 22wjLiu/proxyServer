import {
  MetricsService,
  RulesService,
  UpstreamsService,
} from "@/api/generated";
import {
  mapMetricsJSONToInfos,
  mapRulesInfoToInfos,
  mapUpstreamsInfoToInfos,
} from "@/api/maps/data";

async function getMetricsData() {
  const responseVo = await MetricsService.getApiMetrics();
  return mapMetricsJSONToInfos(responseVo.data);
}

async function getRulesInfo() {
  const responseVo = await RulesService.getApiRules();
  return mapRulesInfoToInfos(responseVo.data);
}

async function getUpstreamInfo() {
  const responseVo = await UpstreamsService.getApiUpstreams();
  return mapUpstreamsInfoToInfos(responseVo.data);
}

export const dataService = {
  getMetricsData,
  getRulesInfo,
  getUpstreamInfo,
};
