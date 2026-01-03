import nprogress from 'nprogress';
import { lazy } from 'react';
import { createHashRouter, Navigate, type RouteObject } from 'react-router-dom';
import { LayoutRoot } from '@/components/layout';
import { routes } from './modules';
import 'nprogress/nprogress.css';

export * from './modules';
export * from './guards';
export * from './utils';
export type * from './types';

nprogress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

const NotFound = lazy(() => import('@/pages/exception/404'));
const Login = lazy(() => import('@/pages/login'));

const loadedPaths = new Set<string>();

const rootRoute = [
  {
    path: '/',
    Component: LayoutRoot,
    children: [
      {
        path: '*',
        Component: NotFound,
        handle: {
          title: '404',
        },
      },
      {
        path: '/',
        element: (
          <Navigate
            to="/login"
            replace
          />
        ),
      },
      {
        path: '/login',
        Component: Login,
        handle: {
          title: 'authority.login',
        },
      },
      ...routes,
    ],
    loader: ({ request }) => {
      nprogress.start();

      const relativePath = new URL(request.url).pathname;

      loadedPaths.add(relativePath);

      return null;
    },
    shouldRevalidate: ({ nextUrl }) => {
      const { pathname } = nextUrl;

      if (!loadedPaths.has(pathname)) {
        nprogress.start();
        loadedPaths.add(pathname);
      }

      return false;
    },
  },
] satisfies RouteObject[];

const router = createHashRouter(rootRoute);

export { nprogress, router };
