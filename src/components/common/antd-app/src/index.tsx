import type { ReactNode } from 'react';
import { App } from 'antd';

export interface AntdAppProps {
  children: ReactNode;
}

export function AntdApp({ children }: AntdAppProps) {
  return <App className="h-full">{children}</App>;
}
