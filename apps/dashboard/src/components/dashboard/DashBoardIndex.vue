<script setup lang="ts">
// == 类型 ==
import type {
  LogCardInfo,
  MetricsCardInfo,
  PieChartData,
  UpstreamCardInfo,
} from "@/type/card";
import type { RulesCardInfo } from "@/type/card";
import type { StatisticsCardInfo } from "@/type/card";

// == 组件 ==
import MetricsCard from "@/components/dashboard/components/MetricsCard.vue";
import EchartBarCardProp from "@/components/dashboard/components/EchartBarCardProp.vue";
import EchartBarCardCount from "@/components/dashboard/components/EchartBarCardCount.vue";
import EchartLineCard from "@/components/dashboard/components/EchartLineCard.vue";
import EchartPieCard from "@/components/dashboard/components/EchartPieCard.vue";
import UpStreamCard from "@/components/dashboard/components/UpStreamCard.vue";
import RulesCard from "@/components/dashboard/components/RulesCard.vue";
import StatisticsCard from "@/components/dashboard/components/StatisticsCard.vue";
import LogCard from "@/components/dashboard/components/LogCard.vue";

// == 对象 ==
import { dataService } from "@/api/services/data";

// == 函数 ==
import { onBeforeMount, onMounted, ref } from "vue";
import { throttle } from "lodash-es";

// == 变量 ==
// 指标
const metricsCardInfos = ref<MetricsCardInfo[]>([]);

// 请求时间
const reqTime = ref<string>("");

// 延迟
const totalDelayBuckets = ref<Record<string, number>>();

// 域名
const totalDominBuckets = ref<Record<string, number>>();

// 拦截原因
const blockedReasonData = ref<PieChartData[]>([]);

// 上游
const upstreamCardInfos = ref<UpstreamCardInfo[]>([]);

// 规则
const rulesCardInfo = ref<RulesCardInfo>({
  blackList: 0,
  whiteList: 0,
  tld: 0,
  keys: 0,
});

// 统计
const statisticsCardInfo = ref<StatisticsCardInfo>({
  total: 0,
  blocked: 0,
  allowRate: "0%",
});

// 日志
const logCardInfos = ref<LogCardInfo[]>([]);

// == 自定义函数 ==
const updateReqTime = throttle(() => {
  reqTime.value = new Date(Date.now()).toLocaleTimeString();
}, 2000);

const updateRulesInfo = throttle(async () => {
  const rulesInfo = await dataService.getRulesInfo();
  rulesCardInfo.value = rulesInfo.rulesCardInfo;
}, 5000);

const updateUpstreamInfo = throttle(async () => {
  const upstreamsInfo = await dataService.getUpstreamInfo();
  upstreamCardInfos.value = upstreamsInfo.upstreamCardInfos;
}, 2000);

// == 生命周期函数 ==
let timer: NodeJS.Timeout;
onMounted(async () => {
  // 初始化
  const metricsRes = await dataService.getMetricsData();
  metricsCardInfos.value = metricsRes.metricsCardInfos;
  totalDelayBuckets.value = metricsRes.totalDelayBuckets;
  totalDominBuckets.value = metricsRes.totalDominBuckets;
  blockedReasonData.value = metricsRes.blockedReasonData;
  statisticsCardInfo.value = metricsRes.statisticsCardInfo;
  logCardInfos.value = metricsRes.logCardInfos;
  updateReqTime();
  updateRulesInfo();
  updateUpstreamInfo();
  timer = setInterval(async () => {
    const metricsRes = await dataService.getMetricsData();
    metricsCardInfos.value = metricsRes.metricsCardInfos;
    totalDelayBuckets.value = metricsRes.totalDelayBuckets;
    totalDominBuckets.value = metricsRes.totalDominBuckets;
    blockedReasonData.value = metricsRes.blockedReasonData;
    statisticsCardInfo.value = metricsRes.statisticsCardInfo;
    logCardInfos.value = metricsRes.logCardInfos;
    updateReqTime();
    updateRulesInfo();
    updateUpstreamInfo();
  }, 1500);
});

onBeforeMount(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="dashboard">
    <section>
      <MetricsCard
        v-for="info in metricsCardInfos"
        :key="info.key"
        :info="info"
      />
    </section>
    <section class="second-session">
      <EchartLineCard
        v-if="metricsCardInfos.length"
        :title="`请求趋势（${metricsCardInfos[0].title} / ${metricsCardInfos[1].title}）`"
        :time="reqTime"
        :first-name="metricsCardInfos[0].title"
        :first-data="Number(metricsCardInfos[0].value)"
        :second-name="metricsCardInfos[1].title"
        :second-data="Number(metricsCardInfos[1].value)"
      />
      <EchartBarCardProp
        title="延迟分布(ms)"
        :time="reqTime"
        type="delay"
        :buckets="totalDelayBuckets ?? {}"
      />
      <UpStreamCard :info="upstreamCardInfos" />
      <EchartBarCardCount
        title="Top 访问域名"
        :time="reqTime"
        :buckets="totalDominBuckets ?? {}"
      />
      <EchartPieCard
        title="拦截原因占比"
        :time="reqTime"
        :data="blockedReasonData"
      />
      <RulesCard :info="rulesCardInfo" />
    </section>
    <section>
      <LogCard :info="logCardInfos" />
      <StatisticsCard :info="statisticsCardInfo" />
    </section>
  </div>
</template>
