<script setup lang="ts">
import type { LogCardInfo } from "@/type/card";

defineProps<{
  info: LogCardInfo[];
}>();
</script>

<template>
  <div class="log-card">
    <div class="title">实时日志</div>
    <div class="logs">
      <div v-for="(l, i) in info" :key="i" class="logline">
        <span class="muted">{{ l.time }}</span>
        <span class="mono">{{ l.proxy }}</span>
        <span class="mono">{{ l.method }}</span>
        <span>{{ `${l.client} -> ${l.target}` }}</span>
        <span class="muted">{{ `${l.sum}次` }}</span>
        <span :class="['badge', l.status >= 400 ? 'bad' : 'ok']">{{
          l.status
        }}</span>
        <span v-if="l.blockReason" class="tag">{{
          `拦截: ${l.blockReason}`
        }}</span>
      </div>
    </div>
  </div>
</template>
