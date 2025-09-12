<script setup lang="ts">
import type { StatisticsCardInfo } from "@/type/card";
defineProps<{
  info: StatisticsCardInfo;
}>();
</script>

<template>
  <div class="statistics-card">
    <div class="title">当前统计</div>
    <div class="kv">
      <div>
        <span>总请求</span><b>{{ info.total }}</b>
      </div>
      <div>
        <span>被拦截</span><b>{{ info.blocked }}</b>
      </div>
      <div>
        <span>放行率</span><b>{{ (100 - info.blockRate).toFixed(1) }}%</b>
      </div>
      <div>
        <span>平均延迟</span><b>{{ info.latencyAvg }} ms</b>
      </div>
    </div>
  </div>
</template>
