import { del, post, put } from '../../request';
import type { ResponseList } from '../../types';
import type { CreateHomeParams, HomeItem, HomeListParams } from './types';

export type * from './types';

export function fetchHomeList(params: HomeListParams) {
  return post<ResponseList<HomeItem[]>>('/home/list', params);
}

export function createHomeItem(params: CreateHomeParams) {
  return post<ResponseList<HomeItem[]>>('/home/create', params);
}

export function editHomeItem(params: HomeItem) {
  return put<ResponseList<HomeItem[]>>('/home/edit', params);
}

export function deleteHomeItem(id: number) {
  return del<ResponseList<HomeItem[]>>(`/home/delete/${id}`);
}
