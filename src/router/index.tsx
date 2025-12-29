import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import nprogress from 'nprogress';
import { LayoutRoot } from '@/components/layout';
import { routes } from './modules';

nprogress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

const loadedPaths = new Set<string>();

const rootRoute: RouteObject[] = [
  {
    path: '/',
    Component: LayoutRoot,
    children: routes,
    loader: ({ request }) => {
      nprogress.start();

      const relativePath = new URL(request.url).pathname;

      loadedPaths.add(relativePath);

      return null;
    },
    shouldRevalidate: ({ nextUrl, currentUrl }) => {
      if (nextUrl.pathname === currentUrl.pathname) {
        return false;
      }

      if (!loadedPaths.has(nextUrl.pathname)) {
        nprogress.start();
        loadedPaths.add(nextUrl.pathname);
      }

      return false;
    },
  },
];

const router = createBrowserRouter(rootRoute);

export { nprogress, router };
