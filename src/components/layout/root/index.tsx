import { PageError } from '@/components/common';
import { nprogress } from '@/router';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

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
