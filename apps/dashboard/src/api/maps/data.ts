import type {
  handlers_MetricsJSON,
  handlers_MetricPoint,
  handlers_HistogramPoint,
  handlers_RulesInfo,
  handlers_NodeStatus,
} from "@/api/generated";
import type {
  MetricsCardInfo,
  RulesCardInfo,
  PieChartData,
  StatisticsCardInfo,
  LogCardInfo,
  UpstreamCardInfo,
} from "@/type/card";
import { BlockedReason, ProxyReqStatus } from "@/type/card";
import { calcPn, clearBuckets } from "@/utils/calcTool";
import { numToLocaleString } from "@/utils/stringTool";

export interface MetricsJSONMapedInfos {
  metricsCardInfos: MetricsCardInfo[];
  totalDelayBuckets: Record<string, number>;
  totalDominBuckets: Record<string, number>;
  blockedReasonData: PieChartData[];
  statisticsCardInfo: StatisticsCardInfo;
  logCardInfos: LogCardInfo[];
}

export interface RulesInfoMapedInfos {
  rulesCardInfo: RulesCardInfo;
}

export interface UpstreamsInfoMapedInfos {
  upstreamCardInfos: UpstreamCardInfo[];
}

export function mapMetricsJSONToInfos(
  response: handlers_MetricsJSON,
): MetricsJSONMapedInfos {
  const { counters, gauges, histograms } = response;

  // 所有代理请求
  const totoalProxyReq: handlers_MetricPoint[] =
    counters?.proxy_requests_total ?? [];

  // 活跃连接数
  const activeConn: handlers_MetricPoint[] =
    gauges?.proxy_active_connections ?? [];

  // 延迟直方图
  const reqDurHist: handlers_HistogramPoint[] =
    histograms?.proxy_request_duration_seconds ?? [];

  // 信息
  const infos: MetricsCardInfo[] = [];

  // QPS
  if (gauges?.proxy_qps && gauges?.proxy_qps.length) {
    infos.push({
      key: "qps",
      title: "当前 QPS",
      value: numToLocaleString(gauges?.proxy_qps[0].value ?? 0),
      sub: `峰值 ${numToLocaleString(gauges?.proxy_qps_peak[0].value ?? 0)}`,
    });
  } else {
    infos.push({
      key: "qps",
      title: "当前 QPS",
      value: "0",
      sub: "峰值 0",
    });
  }

  // 并发连接
  infos.push({
    key: "conns",
    title: "并发连接",
    value: numToLocaleString(
      activeConn.reduce((sum, item) => sum + (item.value ?? 0), 0),
    ),
    sub: `峰值 ${numToLocaleString(gauges?.proxy_active_connections_peak[0].value ?? 0)}`,
  });

  // p95 延迟
  let totalDelayBuckets: Record<string, number> = {};
  if (reqDurHist && reqDurHist.length) {
    const totalSum = reqDurHist.reduce((sum, item) => sum + (item.sum ?? 0), 0);
    const totoalCount = reqDurHist.reduce(
      (sum, item) => sum + (item.count ?? 0),
      0,
    );
    const initialBuckets: Record<string, number> = {};
    for (const key in reqDurHist[0].buckets) {
      initialBuckets[key] = 0;
    }
    totalDelayBuckets = reqDurHist.reduce((sum, item) => {
      for (const key in item.buckets) {
        sum[key] += item.buckets[key];
      }
      return sum;
    }, initialBuckets);
    clearBuckets(totalDelayBuckets);
    infos.push({
      key: "lat95",
      title: "p95 延迟",
      value: `${calcPn(0.95, totoalCount, totalDelayBuckets)} ms`,
      sub: `平均 ${(totalSum / totoalCount).toFixed(2)} ms`,
    });
  } else {
    infos.push({
      key: "lat95",
      title: "p95 延迟",
      value: "0 ms",
      sub: "平均 0 ms",
    });
  }

  // 当前统计
  const blockedReq = totoalProxyReq.filter(
    (item) => item.labels && item.labels.status === ProxyReqStatus.BLOCKED,
  );
  const totalReqNum = totoalProxyReq.reduce(
    (sum, item) => sum + (item.value ?? 0),
    0,
  );
  const blockedReqNum = blockedReq.reduce(
    (sum, item) => sum + (item.value ?? 0),
    0,
  );
  const blockedPer = blockedReqNum / totalReqNum;
  const statisticsCardInfo: StatisticsCardInfo = {
    total: totalReqNum,
    blocked: blockedReqNum,
    allowRate: `${(Number.isNaN(blockedPer) ? 100 : (1 - blockedPer) * 100).toFixed(2)}%`,
  };

  // 拦截数据
  infos.push({
    key: "blocked",
    title: "拦截数据",
    value: numToLocaleString(blockedReqNum),
    sub: `占比 ${Number.isNaN(blockedPer) ? 0 : (blockedPer * 100).toFixed(2)}%`,
  });

  // 拦截原因
  const otherReasonName = "其他";
  const blockedReasonDataRecord: Record<string, number> = {};
  blockedReq.forEach((item) => {
    const key =
      BlockedReason.find((reason) => reason === item.labels!.blocked_reason) ??
      otherReasonName;
    blockedReasonDataRecord[key] =
      (blockedReasonDataRecord[key] || 0) + (item.value ?? 0);
  });
  const blockedReasonData: PieChartData[] = [];
  BlockedReason.forEach((reason) => {
    if (blockedReasonDataRecord[reason])
      blockedReasonData.push({
        name: reason,
        value: blockedReasonDataRecord[reason],
      });
  });
  if (blockedReasonDataRecord[otherReasonName]) {
    blockedReasonData.push({
      name: otherReasonName,
      value: blockedReasonDataRecord[otherReasonName],
    });
  }

  // 访问域名
  const validReq = totoalProxyReq.filter(
    (item) => item.labels && item.labels.target !== "",
  );
  const totalDominBuckets = validReq.reduce(
    (sum, item) => {
      const target = item.labels!.target.split(":")[0];
      sum[target] = (sum[target] || 0) + (item.value ?? 0);
      return sum;
    },
    {} as Record<string, number>,
  );

  // 日志
  const logCardInfos: LogCardInfo[] = validReq.map((req) => {
    const labels = req.labels!;
    const status = Number(labels.status);
    return {
      time: labels.time,
      proxy: labels.proxy,
      method: labels.method,
      client: labels.client,
      target: labels.target,
      sum: req.value,
      status: Number.isNaN(status) ? 0 : status,
      blockReason: labels.blocked_reason,
    } as LogCardInfo;
  });

  return {
    metricsCardInfos: infos,
    totalDelayBuckets,
    totalDominBuckets,
    blockedReasonData,
    statisticsCardInfo,
    logCardInfos,
  };
}

export function mapRulesInfoToInfos(
  response: handlers_RulesInfo,
): RulesInfoMapedInfos {
  return {
    rulesCardInfo: {
      blackList: response.blacklist?.length ?? 0,
      whiteList: response.whitelist?.length ?? 0,
      tld: response.tld?.length ?? 0,
      keys: response.keywords?.length ?? 0,
    },
  };
}

export function mapUpstreamsInfoToInfos(
  response: handlers_NodeStatus[],
): UpstreamsInfoMapedInfos {
  return {
    upstreamCardInfos: response.map((item) => {
      return {
        url: item.url,
        alive: item.alive,
        conns: item.conns,
      } as UpstreamCardInfo;
    }),
  };
}
