// import { useLayoutContentStyle } from '#src/hooks/use-layout-style';
import { CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT, ELEMENT_ID_MAIN_CONTENT } from '@/constants/layout';
import { LayoutFooter } from '@/components/layout';
import { Spinner } from '@/components/common';
// import { useAccessStore } from '#src/store/access';
// import { useTabsStore } from '#src/store/tabs';

import { theme } from 'antd';
import { KeepAlive, useKeepAliveRef } from 'keepalive-for-react';
import { useEffect, useMemo } from 'react';

import { useLocation, useOutlet } from 'react-router-dom';

export function LayoutContent() {
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const { pathname, search } = useLocation();
  const outlet = useOutlet();
  // const { contentElement } = useLayoutContentStyle();
  const aliveRef = useKeepAliveRef();

  const cacheKey = useMemo(() => {
    return `${pathname}${search}`;
  }, [pathname, search]);

  // useEffect(() => {
  //   const cacheNodes = aliveRef.current?.getCacheNodes?.();
  //   cacheNodes?.forEach(node => {
  //     if (!openTabs.has(node.cacheKey)) {
  //       aliveRef.current?.destroy(node.cacheKey);
  //     }
  //   });
  // }, [openTabs]);

  return (
    <main
      id={ELEMENT_ID_MAIN_CONTENT}
      // ref={contentElement}
      className="relative grow overflow-x-hidden overflow-y-auto"
      style={{
        backgroundColor: colorBgLayout,
      }}
    >
      <Spinner>
        <div className="flex h-full flex-col">
          <div
            style={{
              height: `var(${CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT})`,
            }}
          >
            <KeepAlive
              max={20}
              transition
              duration={300}
              cacheNodeClassName="keepalive-fade-slide"
              activeCacheKey={cacheKey}
              aliveRef={aliveRef}
            >
              {outlet}
            </KeepAlive>
          </div>

          <LayoutFooter />
        </div>
      </Spinner>
    </main>
  );
}
