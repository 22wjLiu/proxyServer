<script setup lang="ts">
import { reactive } from "vue";

const upstreams = reactive([
  { url: "http://10.0.0.11:8080", healthy: true, rtt: 21 },
  { url: "http://10.0.0.12:8080", healthy: true, rtt: 25 },
  { url: "socks5://10.0.0.13:1080", healthy: false, rtt: 0 },
]);

const logs = reactive(
  Array.from({ length: 16 }).map((_, i) => ({
    time: new Date(Date.now() - i * 2000).toLocaleTimeString(),
    method: "CONNECT",
    host: `example${i % 5}.com`,
    upstream: upstreams[i % upstreams.length].url,
    status: i % 7 === 0 ? 403 : 200,
    latency: Math.round(20 + Math.random() * 120),
    blockReason: i % 7 === 0 ? ["TLD", "关键词", "黑名单"][i % 3] : "",
  })),
);
</script>

<template>
  <div class="log-card">
    <div class="title">实时日志</div>
    <div class="logs">
      <div v-for="(l, i) in logs" :key="i" class="logline">
        <span class="muted">{{ l.time }}</span>
        <span class="mono">{{ l.method }}</span>
        <span>{{ l.host }}</span>
        <span class="muted"> → {{ l.upstream }}</span>
        <span :class="['badge', l.status >= 400 ? 'bad' : 'ok']">{{
          l.status
        }}</span>
        <span class="muted">{{ l.latency }}ms</span>
        <span v-if="l.blockReason" class="tag">拦截: {{ l.blockReason }}</span>
      </div>
    </div>
  </div>
</template>
