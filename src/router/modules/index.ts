import { lazy } from 'react';

const NotFound = lazy(() => import('@/pages/exception/404'));
const Login = lazy(() => import('@/pages/login'));
const Home = lazy(() => import('@/pages/home'));

export const routes = [
  {
    path: '*',
    Component: NotFound,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: Home,
  },
];
