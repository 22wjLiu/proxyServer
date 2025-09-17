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
import { useColorScheme } from "@/composables/theme";

// == 函数 ==
import { onMounted, onUnmounted, ref, watch } from "vue";
import { calcBucketsTopNEntries } from "@/utils/calcTool";
import { Palette } from "@/type/card";

// == 属性 ==
const props = defineProps<{
  title: string;
  time: string;
  buckets: Record<string, number>;
}>();

// == 变量 ==
const { theme } = useColorScheme();
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
function makeOption(): ECOption {
  const topN = calcBucketsTopNEntries(6, props.buckets);

  const palette = Palette[theme.value];

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        const p = Array.isArray(params) ? params[0] : params;
        return `${p.axisValue}<br/>${p.marker}${p.seriesName}：${p.data} 次`;
      },
    },
    grid: { left: 40, right: 16, top: 24, bottom: 40 },
    xAxis: {
      type: "category",
      data: topN.sortedKeys,
      axisLine: { lineStyle: { color: palette.axis } },
      axisTick: { show: palette.tick },
      axisLabel: { color: palette.label },
    },
    yAxis: {
      name: "次数（次）",
      type: "value",
      nameTextStyle: { fontSize: 12, padding: [0, 0, 0, -40] },
      splitLine: { lineStyle: { type: "dashed", color: palette.grid } },
      axisLine: { lineStyle: { color: palette.axis } },
      axisTick: { show: palette.tick },
    },
    series: [
      {
        name: "次数",
        type: "bar",
        barWidth: 24,
        data: topN.sortedValues,
        label: {
          show: true,
          position: "top",
          formatter: "{c}",
          fontSize: 12,
          color: palette.label,
        },
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          shadowBlur: 8,
          shadowColor: palette.shadow,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: palette.barFrom },
              { offset: 1, color: palette.barTo },
            ],
          },
        },
        emphasis: {
          itemStyle: { shadowBlur: 14, shadowColor: palette.shadowEmph },
        },
        animationEasing: "cubicOut",
        animationDuration: 600,
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
