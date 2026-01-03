import { homeRoutes } from './home';
import { exceptionRoutes } from './exception';
import type { AppRouteRecordRaw } from '../types';

export const routes: AppRouteRecordRaw[] = [...homeRoutes, ...exceptionRoutes];
