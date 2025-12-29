import { RouterProvider } from 'react-router-dom';
import { AntdApp } from '@/components/common';
import { router } from './router';

export function App() {
  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
}
