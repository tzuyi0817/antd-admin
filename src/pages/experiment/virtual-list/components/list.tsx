import { useMemo, useRef, useState, type PropsWithChildren, type ReactNode, type UIEvent } from 'react';

interface Props<T> {
  data: T[];
  itemHeight: number;
  overscan?: number;
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
}

const VISIBLE_COUNT = 10;

export function List<T>({ data, itemHeight, overscan = 5, getKey, renderItem }: Props<T> & PropsWithChildren) {
  const [currentTop, setCurrentTop] = useState(0);
  const ticking = useRef(false);

  const containerHeight = useMemo(() => itemHeight * VISIBLE_COUNT, [itemHeight]);

  const totalHeight = useMemo(() => itemHeight * data.length, [itemHeight, data]);

  const { start, end, offsetY } = useMemo(() => {
    const pos = Math.floor(currentTop / itemHeight);
    const startPos = Math.max(0, pos - overscan);
    const endPos = Math.min(pos + VISIBLE_COUNT + overscan, data.length);

    return { start: startPos, end: endPos, offsetY: startPos * itemHeight };
  }, [data, currentTop, itemHeight, overscan]);

  const list = useMemo(() => data.slice(start, end), [data, start, end]);

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const { scrollTop } = event.currentTarget;

    if (ticking.current) return;

    ticking.current = true;
    globalThis.requestAnimationFrame(() => {
      setCurrentTop(scrollTop);
      ticking.current = false;
    });
  }

  return (
    <div
      className="relative overflow-y-scroll bg-white"
      style={{ height: containerHeight }}
      onScroll={onScroll}
    >
      <div style={{ height: totalHeight }}></div>

      <ul
        className="absolute top-0 left-0 list-none will-change-transform"
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        {list.map(item => {
          return (
            <li
              key={getKey(item)}
              className="flex items-center justify-center"
              style={{ height: itemHeight }}
            >
              {renderItem(item)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
