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
  createHomeItem: http.post<PathParams, HomeItem>('*/home/create', async ({ request }) => {
    const params = await request.clone().json();
    const lastItem = MOCK_HOME_LIST.at(-1);
    const id = (lastItem?.id ?? 0) + 1;

    MOCK_HOME_LIST.push({ ...params, id, totalPrice: params.quantity * params.unitPrice });

    await sleep(300);

    return HttpResponse.json({
      message: 'success',
      status: 'success',
      resultMap: true,
    });
  }),
  editHomeItem: http.put<PathParams, HomeItem>('*/home/edit', async ({ request }) => {
    const params = await request.clone().json();
    const index = MOCK_HOME_LIST.findIndex(item => item.itemNumber === params.itemNumber);

    MOCK_HOME_LIST[index] = { ...params, totalPrice: params.quantity * params.unitPrice };

    await sleep(300);

    return HttpResponse.json({
      message: 'success',
      status: 'success',
      resultMap: true,
    });
  }),
  deleteHomeItem: http.delete('*/home/delete/:id', async ({ params }) => {
    const id = Number(params.id);
    const index = MOCK_HOME_LIST.findIndex(item => item.id === id);

    MOCK_HOME_LIST.splice(index, 1);

    await sleep(300);

    return HttpResponse.json({
      message: 'success',
      status: 'success',
      resultMap: true,
    });
  }),
};
