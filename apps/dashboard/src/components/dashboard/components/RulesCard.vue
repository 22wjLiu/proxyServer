<script setup lang="ts">
import type { RulesCardInfo } from "@/type/card";
defineProps<{
  info: RulesCardInfo;
}>();
</script>

<template>
  <div class="rules-card">
    <div class="title">当前规则概览</div>
    <div class="kv">
      <div>
        <span>关键词</span><b>{{ info.keys }}</b>
      </div>
      <div>
        <span>TLD 屏蔽</span><b>{{ info.tld }}</b>
      </div>
      <div>
        <span>黑名单规则</span><b>{{ info.blackList }}</b>
      </div>
      <div>
        <span>白名单规则</span><b>{{ info.whiteList }}</b>
      </div>
    </div>
  </div>
</template>
