import { hideLoading } from '@/plugins/loading';

interface AuthGuardProps {
  children?: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  hideLoading();

  return children;
}
