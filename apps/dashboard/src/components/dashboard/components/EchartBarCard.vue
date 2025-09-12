<script setup lang="ts">
// == 类型 ==
import type { ECharts, ComposeOption } from "echarts/core";

// == 组件 ==
import { BarChart, type BarSeriesOption } from "echarts/charts";

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
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
]);

// 组合后的全局 Option 类型（替代 EChartsOption）
type ECOption = ComposeOption<
  | BarSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | TitleComponentOption
>;

// == 自定义函数 ==
function makeOption(randomize = false): ECOption {
  const buckets = ["<20", "20-50", "50-80", "80-120", "120-200", "200+"];
  const pct = [18, 32, 24, 16, 8, 2].map((v) =>
    randomize ? v + (Math.random() * 4 - 2) : v,
  );
  return {
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 16, top: 24, bottom: 28 },
    xAxis: { type: "category", data: buckets },
    yAxis: { type: "value", axisLabel: { formatter: "{value}%" } },
    series: [
      {
        name: "占比",
        type: "bar",
        data: pct.map((v) => Math.max(0, Math.round(v))),
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
