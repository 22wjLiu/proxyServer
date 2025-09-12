// 指标
export interface MetricsCardInfo {
  key: string;
  title: string;
  value: string;
  sub: string;
}

// 上游
export interface UpstreamCardInfo {
  url: string;
  healthy: boolean;
  rtt: number;
}

// 统计
export interface StatisticsCardInfo {
  total: number;
  blocked: number;
  blockRate: number;
  latencyAvg: number;
}

// 规则
export interface RulesCardInfo {
  blackRules: number;
  whiteRules: number;
  tldBlocks: number;
  activeConns: number;
}
