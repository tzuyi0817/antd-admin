import type { HomeItem } from './types';
import { get } from '../../request';
import type { ResponseList } from '../../types';

export type * from './types';

export function fetchHomeList(page: number, pageSize: number) {
  return get<ResponseList<HomeItem[]>>(`/home?page=${page}&pageSize=${pageSize}`);
}
