import type { ReactNode } from 'react';
import type { createBrowserRouter, IndexRouteObject, NonIndexRouteObject } from 'react-router';

export interface IndexRouteMeta extends Omit<IndexRouteObject, 'id'> {
  redirect?: string;
  handle: RouteMeta;
}

export interface NonIndexRouteMeta extends Omit<NonIndexRouteObject, 'id'> {
  redirect?: string;
  handle: RouteMeta;
  children?: AppRouteRecordRaw[];
}

export type AppRouteRecordRaw = IndexRouteMeta | NonIndexRouteMeta;

export interface RouteMeta {
  title: ReactNode;
  icon?: ReactNode;
  keepAlive?: boolean;
  hideInMenu?: boolean;
  currentActiveMenu?: string;
}

export type ReactRouterType = ReturnType<typeof createBrowserRouter>;
export type RouterSubscriber = Parameters<ReactRouterType['subscribe']>[0];
export type RouterState = ReactRouterType['state'];
export type RouterNavigate = ReactRouterType['navigate'];
export type RouteFileModule = Record<string, { default: AppRouteRecordRaw[] }>;
