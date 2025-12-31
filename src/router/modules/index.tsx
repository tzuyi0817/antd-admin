import { lazy, createElement } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { LayoutContainer } from '@/components/layout';
import type { AppRouteRecordRaw } from '../types';

const Home = lazy(() => import('@/pages/home'));

export const routes: AppRouteRecordRaw[] = [
  {
    path: '/home',
    Component: LayoutContainer,
    handle: {
      title: 'common.menu.home',
      icon: createElement(HomeOutlined),
    },
    children: [
      {
        index: true,
        Component: Home,
        handle: {
          title: 'common.menu.home',
          icon: createElement(HomeOutlined),
        },
      },
    ],
  },
];
