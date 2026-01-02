import { http, HttpResponse, type PathParams } from 'msw';
import { sleep } from '@/utils/common';
import type { HomeItem, HomeListParams } from '@/services/http';
import { MOCK_HOME_LIST } from './constants';

export const mockHome = {
  fetchHomeList: http.post<PathParams, HomeListParams>('*/home/list', async ({ request }) => {
    const { page, pageSize, itemNumber, productName } = await request.clone().json();
    const filteredList: HomeItem[] = MOCK_HOME_LIST.filter(item => {
      if (!itemNumber && !productName) return true;
      if (!itemNumber) return item.productName === productName;
      if (!productName) return item.itemNumber === itemNumber;

      return item.itemNumber === itemNumber && item.productName === productName;
    });

    const start = (Number(page) - 1) * Number(pageSize);
    const list = filteredList.slice(start, start + Number(pageSize));
    const total = filteredList.length;

    await sleep(300);

    return HttpResponse.json({
      message: 'success',
      status: 'success',
      resultMap: { list, page, pageSize, total },
    });
  }),
};
