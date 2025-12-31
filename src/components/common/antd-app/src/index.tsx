import { App, theme } from 'antd';
import { useEffect, type ReactNode } from 'react';
import { ThemeProvider } from 'react-jss';
import { setupAntdTokens } from '@/plugins/tailwind/antd';

export interface AntdAppProps {
  children: ReactNode;
}

export function AntdApp({ children }: AntdAppProps) {
  const { token } = theme.useToken();

  useEffect(() => {
    setupAntdTokens(token);
  }, [token]);

  return (
    <ThemeProvider theme={{ token }}>
      <App className="h-full">{children}</App>
    </ThemeProvider>
  );
}
