<script setup lang="ts">
// == 类型 ==
import type { MetricsCardInfo } from "@/type/card";

// == 属性 ==
defineProps<{
  info: MetricsCardInfo;
}>();
</script>

<template>
  <div class="metrics-card">
    <div class="title">
      {{ info.title }}
    </div>
    <div class="value">
      {{ info.value }}
    </div>
    <div class="sub">
      {{ info.sub }}
    </div>
  </div>
</template>
