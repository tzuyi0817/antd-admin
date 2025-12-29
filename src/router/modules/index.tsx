import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = lazy(() => import('@/pages/exception/404'));
const Login = lazy(() => import('@/pages/login'));
const Home = lazy(() => import('@/pages/home'));

export const routes = [
  {
    path: '*',
    Component: NotFound,
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
  },
  {
    path: '/home',
    Component: Home,
  },
];
