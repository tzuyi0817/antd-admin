import { useResponsive } from 'ahooks';

export function useDevice() {
  /**
   *   xs: 0,
   *   sm: 576,
   *   md: 768,
   *   lg: 992,
   *   xl: 1200,
   */
  const responsive = useResponsive();
  const isMobile = (responsive.xs && !responsive.sm) || (responsive.sm && !responsive.md);
  const isIpad = responsive.md && !responsive.xl;
  const isPC = responsive.xl;

  return { isMobile, isIpad, isPC };
}
