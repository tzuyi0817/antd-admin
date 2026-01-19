import { ExperimentOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { createElement, lazy } from 'react';
import { LayoutContainer } from '@/components/layout';
import type { AppRouteRecordRaw } from '../types';

const VirtualList = lazy(() => import('@/pages/experiment/virtual-list'));

export const experimentRoutes: AppRouteRecordRaw[] = [
  {
    path: '/experiment',
    Component: LayoutContainer,
    handle: {
      title: 'common.menu.experiment',
      icon: createElement(ExperimentOutlined),
    },
    children: [
      {
        path: '/experiment/virtual-list',
        Component: VirtualList,
        handle: {
          title: 'common.menu.virtualList',
          icon: createElement(UnorderedListOutlined),
        },
      },
    ],
  },
];
