<script setup lang="ts">
import type { UpstreamCardInfo } from "@/type/card";

defineProps<{
  info: UpstreamCardInfo[];
}>();
</script>

<template>
  <div class="upstream-card">
    <div class="title">上游健康检查</div>
    <ul class="list">
      <li v-for="n in info" :key="n.url">
        <span class="dot" :class="n.alive ? 'ok' : 'bad'"></span>
        <span class="mono">{{ n.url }}</span>
      </li>
    </ul>
  </div>
</template>
