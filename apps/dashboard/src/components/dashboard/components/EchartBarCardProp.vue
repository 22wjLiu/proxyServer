<script setup lang="ts">
// == 类型 ==
import type { ECharts, ComposeOption } from "echarts/core";
import { BarChartCategory, Palette, type BarChartPropType } from "@/type/card";

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
import { calcBucketsNumForBarChartProp } from "@/utils/calcTool";

// == 属性 ==
const props = defineProps<{
  title: string;
  time: string;
  type: BarChartPropType;
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

// 数据数组
const bucketsCate: string[] = BarChartCategory[props.type];

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
  const palette = Palette[theme.value];

  return {
    tooltip: {
      trigger: "axis",
      valueFormatter: (value) => value + "%",
      axisPointer: { type: "shadow" },
      backgroundColor: palette.tooltipBg,
      textStyle: { color: palette.tooltipText },
    },
    grid: { left: 40, right: 16, top: 24, bottom: 40 },
    xAxis: {
      type: "category",
      data: bucketsCate,
      axisLine: { lineStyle: { color: palette.axis } },
      axisTick: { show: palette.tick },
      axisLabel: { color: palette.label },
    },
    yAxis: {
      name: "占比（%）",
      type: "value",
      axisLabel: { formatter: "{value}%", color: palette.label },
      nameTextStyle: {
        fontSize: 12,
        padding: [0, 0, 0, -40],
        color: palette.label,
      },
      splitLine: { lineStyle: { type: "dashed", color: palette.grid } },
      axisLine: { lineStyle: { color: palette.axis } },
      axisTick: { show: palette.tick },
    },
    series: [
      {
        name: "占比",
        type: "bar",
        barWidth: 24,
        data: calcBucketsNumForBarChartProp(props.type, props.buckets),
        label: {
          show: true,
          position: "top",
          formatter: "{c}%",
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
