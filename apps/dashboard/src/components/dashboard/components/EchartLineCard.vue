<script setup lang="ts">
// == 类型 ==
import type { ECharts, ComposeOption } from "echarts/core";

// == 组件 ==
import { LineChart, type LineSeriesOption } from "echarts/charts";

import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  type GridComponentOption,
  type TooltipComponentOption,
  type LegendComponentOption,
  type TitleComponentOption,
} from "echarts/components";

// == 对象 ==
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

// == 函数 ==
import { onMounted, onUnmounted, ref } from "vue";

// == 属性 ==
defineProps<{
  title: string;
}>();

// == 变量 ==
const cardDiv = ref<HTMLDivElement | null>(null);

let chart: ECharts | null = null;

const resizeObserver = new ResizeObserver(() => {
  chart?.resize();
});

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
]);

// 组合后的全局 Option 类型（替代 EChartsOption）
type ECOption = ComposeOption<
  | LineSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | TitleComponentOption
>;

// == 自定义函数 ==
function makeOption(): ECOption {
  const t = Array.from({ length: 30 }, (_, i) =>
    new Date(Date.now() - (30 - 1 - i) * 2000).toLocaleTimeString(),
  );
  const qps = t.map(() => 120 + Math.round(Math.random() * 100));
  const conns = t.map(() => 900 + Math.round(Math.random() * 800));
  return {
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 16, top: 24, bottom: 28 },
    legend: { data: ["QPS", "并发连接"] },
    xAxis: { type: "category", data: t },
    yAxis: [
      { type: "value", name: "QPS" },
      { type: "value", name: "连接数" },
    ],
    series: [
      { name: "QPS", type: "line", smooth: true, symbol: "none", data: qps },
      {
        name: "并发连接",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        symbol: "none",
        data: conns,
      },
    ],
  };
}

// == 生命周期函数 ==
onMounted(() => {
  if (cardDiv.value) {
    chart = echarts.init(cardDiv.value);
    chart.setOption(makeOption());
    resizeObserver.observe(cardDiv.value);
  }
});

onUnmounted(() => {
  chart?.dispose();
});
</script>

<template>
  <div class="echart-card">
    <div class="title">{{ title }}</div>
    <div ref="cardDiv" class="chart"></div>
  </div>
</template>
