import { AppstoreOutlined, IssuesCloseOutlined, MinusSquareOutlined, StopOutlined } from '@ant-design/icons';
import { createElement, lazy } from 'react';
import { LayoutContainer } from '@/components/layout';
import type { AppRouteRecordRaw } from '../types';

const Exception403 = lazy(() => import('@/pages/exception/403'));
const Exception404 = lazy(() => import('@/pages/exception/404'));
const Exception500 = lazy(() => import('@/pages/exception/500'));

export const exceptionRoutes: AppRouteRecordRaw[] = [
  {
    path: '/exception',
    Component: LayoutContainer,
    handle: {
      title: 'common.menu.exception',
      icon: createElement(IssuesCloseOutlined),
    },
    children: [
      {
        path: '/exception/403',
        Component: Exception403,
        handle: {
          title: 'common.menu.exception_403',
          icon: createElement(StopOutlined),
        },
      },
      {
        path: '/exception/404',
        Component: Exception404,
        handle: {
          title: 'common.menu.exception_404',
          icon: createElement(MinusSquareOutlined),
        },
      },
      {
        path: '/exception/500',
        Component: Exception500,
        handle: {
          title: 'common.menu.exception_500',
          icon: createElement(AppstoreOutlined),
        },
      },
    ],
  },
];
