import { post } from '../../request';
import type { ResponseList } from '../../types';
import type { HomeItem, HomeListParams } from './types';

export type * from './types';

export function fetchHomeList(params: HomeListParams) {
  return post<ResponseList<HomeItem[]>>('/home/list', params);
}
