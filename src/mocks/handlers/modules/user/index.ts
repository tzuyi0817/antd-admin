import { http, HttpResponse, type PathParams } from 'msw';
import { sleep } from '@/utils/common';
import type { LoginParams } from '@/services/http';

export const mockUser = {
  login: http.post<PathParams, LoginParams>('*/login', async ({ request }) => {
    const { account, password } = await request.clone().json();

    await sleep();

    return HttpResponse.json({
      message: 'login success',
      status: 'success',
      resultMap: {
        user: { account, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' },
        token: password,
      },
    });
  }),
  fetchUserInfo: http.get('*/user-info', () => {
    return HttpResponse.json({
      message: 'login success',
      status: 'success',
      resultMap: {
        user: { account: 'admin' },
        token: import.meta.env.VITE_APP_PASSWORD || '12345678',
      },
    });
  }),
  logout: http.post('*/logout', async () => {
    return HttpResponse.json({
      status: 'success',
      message: 'successfully logout',
    });
  }),
};
