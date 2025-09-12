<script setup lang="ts">
import type { RulesCardInfo } from "@/type/card";
defineProps<{
  info: RulesCardInfo;
}>();
</script>

<template>
  <div class="rules-card">
    <div class="title">当前配置概览</div>
    <div class="kv">
      <div>
        <span>黑名单规则</span><b>{{ info.blackRules }}</b>
      </div>
      <div>
        <span>白名单规则</span><b>{{ info.whiteRules }}</b>
      </div>
      <div>
        <span>TLD 屏蔽</span><b>{{ info.tldBlocks }}</b>
      </div>
      <div>
        <span>活跃连接</span><b>{{ info.activeConns }}</b>
      </div>
    </div>
  </div>
</template>
