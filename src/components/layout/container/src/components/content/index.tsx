import { theme } from 'antd';
import { KeepAlive, useKeepAliveRef } from 'keepalive-for-react';
import { useMemo, useEffect } from 'react';
import { useTabsStore } from '@/stores';
import { useLocation, useOutlet } from 'react-router-dom';
import { Spinner } from '@/components/common';
import { LayoutFooter } from '@/components/layout';
import { CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT, ELEMENT_ID_MAIN_CONTENT } from '@/constants/layout';

export function LayoutContent() {
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const { pathname, search } = useLocation();
  const outlet = useOutlet();
  const openTabs = useTabsStore(state => state.openTabs);
  const aliveRef = useKeepAliveRef();

  const cacheKey = useMemo(() => {
    return `${pathname}${search}`;
  }, [pathname, search]);

  useEffect(() => {
    const cacheNodes = aliveRef.current?.getCacheNodes?.();

    cacheNodes?.forEach(node => {
      if (!openTabs.has(node.cacheKey)) {
        aliveRef.current?.destroy(node.cacheKey);
      }
    });
  }, [openTabs]);

  return (
    <main
      id={ELEMENT_ID_MAIN_CONTENT}
      className="relative mb-10 grow overflow-x-hidden overflow-y-auto"
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

          <LayoutFooter className="bg-colorBgContainer fixed bottom-0 w-full" />
        </div>
      </Spinner>
    </main>
  );
}
