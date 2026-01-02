import { http, HttpResponse } from 'msw';
import { MOCK_HOME_LIST } from './constants';
import { sleep } from '@/utils/common';
import type { HomeItem } from '@/services/http';

export const mockHome = {
  fetchHomeList: http.get('*/home', async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const page = Number(searchParams.get('page'));
    const pageSize = Number(searchParams.get('pageSize'));
    const start = (page - 1) * pageSize;
    const list: HomeItem[] = MOCK_HOME_LIST.slice(start, start + pageSize);
    const total = MOCK_HOME_LIST.length;

    await sleep(300);

    return HttpResponse.json({
      message: 'success',
      status: 'success',
      resultMap: { list, page, pageSize, total },
    });
  }),
};
