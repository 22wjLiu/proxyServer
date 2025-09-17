import type { BarChartPropType, SoredTopNRes } from "@/type/card";
import { BarChartCategoryIntervals } from "@/type/card";

/**
 * 清除 bucket 里面的重复值
 *
 * @export
 * @param {Record<string, number>} buckets
 */
export function clearBuckets(buckets: Record<string, number>) {
  const sortedEntries = Object.keys(buckets)
    .map((k) => [Number(k), buckets[k]] as const)
    .filter(([n]) => !Number.isNaN(n))
    .sort((a, b) => a[0] - b[0]);

  for (const key in buckets) {
    buckets[key] = 0;
  }

  let prevCum = 0;
  for (const [upper, cumRaw] of sortedEntries) {
    const cum = cumRaw ?? 0;

    const per = Math.max(0, cum - prevCum);
    prevCum = cum;

    buckets[upper.toString()] += per;
  }
}

/**
 * 计算 p 分位所在的 key（按数值升序累计）。
 *
 * @export
 * @param {number} p
 * @param {number} count
 * @param {Record<string, number>} buckets
 * @return {*}  {string}
 */
export function calcPn(
  p: number,
  count: number,
  buckets: Record<string, number>,
): string {
  // 边界处理
  if (!Number.isFinite(count) || count <= 0) return "0";

  const pp = Math.min(1, Math.max(0, p));
  const target = Math.max(1, Math.ceil(pp * count));

  let acc = 0;
  const sortedKeys = Object.keys(buckets)
    .map((k) => Number(k))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);

  for (const numKey of sortedKeys) {
    const k = String(numKey);
    acc += buckets[k] ?? 0;
    if (acc >= target) return k;
  }

  return sortedKeys.length ? String(sortedKeys[sortedKeys.length - 1]) : "0";
}

/**
 * 二分找到 keyNum 应归属的桶索引
 *
 * @export
 * @param {number} keyNum
 * @param {number[]} intervals
 * @return {*}  {number}
 */
export function locateKeyNum(keyNum: number, intervals: number[]): number {
  let lo = 0,
    hi = intervals.length - 1,
    ans = intervals.length; // 默认最后一个桶（> max）
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (keyNum <= intervals[mid]) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return ans;
}

/**
 * 将 buckets 归并到柱状图区间。
 * e.g. 当 type 为 "delay"时, intervals 表示各阈值，生成 len(intervals)+1 个桶。
 * @export
 * @param {BarChartPropType} type
 * @param {Record<string, number>} buckets
 * @return {*}  {number[]}
 */
export function calcBucketsNumForBarChartProp(
  type: BarChartPropType,
  buckets: Record<string, number>,
): number[] {
  const intervals = BarChartCategoryIntervals[type] ?? [];
  const len = intervals.length + 1;
  const temp = new Array<number>(len).fill(0);

  const sortedEntries = Object.keys(buckets)
    .map((k) => [Number(k), buckets[k]] as const)
    .filter(([n]) => !Number.isNaN(n))
    .sort((a, b) => a[0] - b[0]);

  for (const [key, val] of sortedEntries) {
    const idx = locateKeyNum(key, intervals); // 你的分箱定位函数
    temp[idx] += val;
  }

  const sum = temp.reduce((acc, item) => acc + item, 0);
  return temp.map((item) => Number(((item / sum) * 100).toFixed(2)));
}

/**
 * 获取 buckets 中前 topN 信息
 * 其余项放到 其他
 *
 * @export
 * @param {number} topNum
 * @param {Record<string, number>} buckets
 * @return {*}  {SoredTopNRes}
 */
export function calcBucketsTopNEntries(
  topNum: number,
  buckets: Record<string, number>,
): SoredTopNRes {
  // 规范化 topNum
  let n = Math.floor(topNum);
  if (!Number.isFinite(n) || n <= 0) {
    return { sortedKeys: [], sortedValues: [] };
  }

  const entries = Object.entries(buckets) as [string, number][];
  if (entries.length === 0) {
    return { sortedKeys: [], sortedValues: [] };
  }

  // 按 value 降序（最大在前）；同值时按 key 稳定次序，保证结果确定性
  entries.sort(
    (a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0),
  );

  if (n > entries.length) n = entries.length;

  const top = entries.slice(0, n);
  const sortedKeys = top.map(([k]) => k);
  const sortedValues = top.map(([, v]) => v);

  // 其余总和 = 全部 - topN 总和
  const total = entries.reduce((s, [, v]) => s + v, 0);
  const topSum = sortedValues.reduce((s, v) => s + v, 0);

  const otherCount = total - topSum;

  if (otherCount) {
    sortedKeys.push("其他");
    sortedValues.push(total - topSum);
  }

  return { sortedKeys, sortedValues };
}
