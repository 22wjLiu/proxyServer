<script setup lang="ts">
// == 类型 ==
import type { ECharts, ComposeOption } from "echarts/core";

// == 组件 ==
import { PieChart, type PieSeriesOption } from "echarts/charts";

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
import { onMounted, onUnmounted, ref, watch } from "vue";
import type { PieChartData } from "@/type/card";

// == 属性 ==
const props = defineProps<{
  title: string;
  time: string;
  data: PieChartData[];
}>();

// == 变量 ==
const cardDiv = ref<HTMLDivElement | null>(null);

let chart: ECharts | null = null;

const resizeObserver = new ResizeObserver(() => {
  chart?.resize();
});

echarts.use([
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
]);

// 组合后的全局 Option 类型（替代 EChartsOption）
type ECOption = ComposeOption<
  | PieSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | TitleComponentOption
>;

// == 自定义函数 ==
function makeOption(): ECOption {
  return {
    tooltip: { trigger: "item" },
    legend: { top: "bottom" },
    series: [
      {
        type: "pie",
        radius: ["35%", "65%"],
        center: ["50%", "40%"],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 3, borderWidth: 1 },
        data: props.data,
      },
    ],
  };
}

// == 监控变量 ==
watch(
  () => props.time,
  () => {
    if (chart !== null) {
      chart.setOption(makeOption());
    }
  },
);

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
