/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type handlers_NodeStatus = {
  /**
   * host:port
   */
  addr?: string;
  /**
   * 存活
   */
  alive?: boolean;
  /**
   * 当前连接数（least-conn可用）
   */
  conns?: number;
  /**
   * http | socks5
   */
  type?: string;
  /**
   * 原始URL串（含scheme）
   */
  url?: string;
};
