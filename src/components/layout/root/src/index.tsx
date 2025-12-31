import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageError } from '@/components/common';
import { nprogress } from '@/router';
import { isString } from '@/utils/check-type';
import { AuthGuard, type AppRouteRecordRaw } from '@/router';

export function LayoutRoot() {
  const matches = useMatches();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const currentRoute = matches[matches.length - 1];
    const handle = currentRoute.handle as AppRouteRecordRaw['handle'];

    if (handle) {
      const documentTitle = handle.title;
      const newTitle = isString(documentTitle) ? documentTitle : '';

      document.title = t(newTitle) || document.title;
    }
  }, [t, location]);

  useEffect(() => {
    nprogress.done();
  }, [location.pathname]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    </ErrorBoundary>
  );
}
