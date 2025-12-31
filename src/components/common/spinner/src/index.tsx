import type { ReactNode } from 'react';
import { useConfigStore } from '@/stores';
import clsx from 'clsx';
import { Spin } from 'antd';

import { createUseStyles } from 'react-jss';
import { useSpinDelay } from 'spin-delay';

export interface GlobalSpinProps {
  className?: string;
  children: ReactNode;
}

const useStyles = createUseStyles({
  rootSpin: {
    height: '100%',
    '& .ant-spin-container': {
      height: '100%',
    },
    '& .ant-spin-spinning': {
      maxHeight: '100% !important',
    },
  },
});

export function Spinner({ children, className }: GlobalSpinProps) {
  const classes = useStyles();
  const spinning = useConfigStore(state => state.spinner);
  const loading = useSpinDelay(spinning, { delay: 500, minDuration: 200 });

  return (
    <Spin
      delay={300}
      spinning={loading}
      wrapperClassName={clsx(classes.rootSpin, className)}
    >
      {children}
    </Spin>
  );
}
