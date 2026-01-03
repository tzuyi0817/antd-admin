import type { AppRouteRecordRaw } from '../types';
import { exceptionRoutes } from './exception';
import { homeRoutes } from './home';

export const routes: AppRouteRecordRaw[] = [...homeRoutes, ...exceptionRoutes];
