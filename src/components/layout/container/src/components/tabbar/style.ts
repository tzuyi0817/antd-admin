import { createUseStyles } from 'react-jss';
import type { GlobalToken } from 'antd/es/theme/interface';

export const useStyles: ReturnType<typeof createUseStyles> = createUseStyles(theme => {
  const { token } = theme as { token: GlobalToken };

  return {
    tabsContainer: {
      backgroundColor: token.colorBgContainer,
      borderTop: `1px solid ${token.colorBorderSecondary}`,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    },
    resetTabs: {
      '& .ant-tabs-nav::before': {
        display: 'none',
      },
      '& .ant-tabs-nav': {
        margin: 0,
        '& .ant-tabs-tab': {
          transition: 'inherit',
          marginLeft: '0px !important',
          border: 'none !important',
          borderRadius: '0px !important',
          paddingTop: '0.3em !important',
          paddingBottom: '0.3em !important',
        },
      },
    },
    chrome: {
      '& .ant-tabs-nav': {
        '& .ant-tabs-nav-list': {
          gap: '5px',
        },
        '& .ant-tabs-tab:not(.ant-tabs-tab-active)': {
          backgroundColor: token.colorBgContainer,
          position: 'relative',
          borderRadius: '7px !important',
          padding: '0px 12px !important',
          marginTop: '3px',
          marginBottom: '3px',
          '&:hover': {
            backgroundColor: token.colorBorder,
            color: 'inherit',
          },
          '&:hover::before': {
            content: "' '",
            height: '100%',
            width: '1px',
            backgroundColor: token.colorBgContainer,
            left: '-3px',
            position: 'absolute',
          },
          '&:hover::after': {
            display: 'none',
          },
          '&::after': {
            content: "' '",
            position: 'absolute',
            right: '-3px',
            width: '1px',
            height: '16px',
            backgroundColor: token.colorBorder,
          },
        },
        '& .ant-tabs-tab-active': {
          marginTop: '3px',
          height: '32px',
          padding: '0px 12px 3px !important',
          backgroundColor: token.colorPrimaryBg,
          borderTopLeftRadius: '7px !important',
          borderTopRightRadius: '7px !important',
          position: 'relative',
          '&::before': {
            content: "' '",
            position: 'absolute',
            left: '-7px',
            bottom: '0',
            width: '7px',
            height: '7px',
            backgroundColor: token.colorPrimaryBg,
            transform: 'rotate(-90deg)',
            zIndex: 1,
            clipPath: "path('M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z')",
          },
          '&>div::before': {
            content: "' '",
            height: '100%',
            width: '1px',
            backgroundColor: token.colorBgContainer,
            left: '-3px',
            position: 'absolute',
          },
          '&::after': {
            content: "' '",
            position: 'absolute',
            right: '-7px',
            bottom: '0',
            width: '7px',
            height: '7px',
            zIndex: 1,
            backgroundColor: token.colorPrimaryBg,
            clipPath: "path('M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z')",
          },
        },
      },
    },
  };
});
