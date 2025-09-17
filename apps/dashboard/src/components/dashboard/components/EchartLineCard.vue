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
import { onMounted, onUnmounted, ref, watch } from "vue";

// == 属性 ==
const props = defineProps<{
  title: string;
  time: string;
  firstName: string;
  firstData: number;
  secondName: string;
  secondData: number;
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

// 数据数组最大长度
const MAX_LENGTH: number = 60;

// 数据数组
const times: string[] = [];
const fristDatas: number[] = [];
const secondDatas: number[] = [];

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
  return {
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 16, top: 24, bottom: 40 },
    legend: { data: [props.firstName, props.secondName], bottom: 0 },
    xAxis: { type: "category", data: times },
    yAxis: [
      { type: "value", name: props.firstName },
      { type: "value", name: props.secondName },
    ],
    series: [
      {
        name: props.firstName,
        type: "line",
        smooth: true,
        symbol: "none",
        data: fristDatas,
      },
      {
        name: props.secondName,
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        symbol: "none",
        data: secondDatas,
      },
    ],
  };
}

// == 监控变量 ==
watch(
  () => props.time,
  () => {
    if (chart !== null) {
      times.push(props.time);
      fristDatas.push(props.firstData);
      secondDatas.push(props.secondData);
      if (times.length > MAX_LENGTH) {
        times.shift();
        fristDatas.shift();
        secondDatas.shift();
      }
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
