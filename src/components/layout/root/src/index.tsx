import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import { PageError } from '@/components/common';
import { nprogress } from '@/router';

export function LayoutRoot() {
  const location = useLocation();

  useEffect(() => {
    nprogress.done();
  }, [location.pathname]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>
      <Outlet />
    </ErrorBoundary>
  );
}
