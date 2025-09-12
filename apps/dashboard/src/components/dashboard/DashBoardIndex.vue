<script setup lang="ts">
// == 类型 ==
import type { MetricsCardInfo, UpstreamCardInfo } from "@/type/card";
import type { RulesCardInfo } from "@/type/card";
import type { StatisticsCardInfo } from "@/type/card";

// == 组件 ==
import MetricsCard from "@/components/dashboard/components/MetricsCard.vue";
import EchartBarCard from "@/components/dashboard/components/EchartBarCard.vue";
import EchartLineCard from "@/components/dashboard/components/EchartLineCard.vue";
import EchartPieCard from "@/components/dashboard/components/EchartPieCard.vue";
import UpStreamCard from "@/components/dashboard/components/UpStreamCard.vue";
import RulesCard from "@/components/dashboard/components/RulesCard.vue";
import StatisticsCard from "@/components/dashboard/components/StatisticsCard.vue";
import LogCard from "@/components/dashboard/components/LogCard.vue";

// == 对象 ==
import { dataService } from "@/api/services/data";

// == 函数 ==
import { onMounted, ref } from "vue";

// == 变量 ==
// 指标
const metricsCardInfos = ref<MetricsCardInfo[]>([]);
// 上游
const upstreamCardInfos = ref<UpstreamCardInfo[]>([
  { url: "http://10.0.0.11:8080", healthy: true, rtt: 21 },
  { url: "http://10.0.0.12:8080", healthy: true, rtt: 25 },
  { url: "socks5://10.0.0.13:1080", healthy: false, rtt: 0 },
]);
// 规则
const rulesCardInfo = ref<RulesCardInfo>({
  blackRules: 0,
  whiteRules: 0,
  tldBlocks: 0,
  activeConns: 0,
});
// 统计
const statisticsCardInfo = ref<StatisticsCardInfo>({
  total: 0,
  blocked: 0,
  blockRate: 0,
  latencyAvg: 0,
});

// == 自定义函数 ==

// == 生命周期函数 ==
onMounted(async () => {
  // 初始化
  // 指标
  const metricsRes = await dataService.getMetricsCardInfos();
  metricsCardInfos.value = metricsRes.data;

  // 规则
  const rulesRes = await dataService.getRulesCardInfos();
  rulesCardInfo.value = rulesRes.data;

  // 统计数据
  const statisticsRes = await dataService.getStatisticsCardInfos();
  statisticsCardInfo.value = statisticsRes.data;
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
      <EchartLineCard title="请求趋势（QPS / 并发）" />
      <EchartBarCard title="延迟分布（p50/p95）" />
      <UpStreamCard :info="upstreamCardInfos" />
      <EchartBarCard title="Top 访问域名" />
      <EchartPieCard title="拦截原因占比" />
      <RulesCard :info="rulesCardInfo" />
    </section>
    <section>
      <LogCard />
      <StatisticsCard :info="statisticsCardInfo" />
    </section>
  </div>
</template>
