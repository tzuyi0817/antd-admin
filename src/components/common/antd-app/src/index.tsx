import { App } from 'antd';
import type { ReactNode } from 'react';

export interface AntdAppProps {
  children: ReactNode;
}

export function AntdApp({ children }: AntdAppProps) {
  return <App className="h-full">{children}</App>;
}
