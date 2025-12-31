import { createUseStyles } from 'react-jss';

export const useStyles: ReturnType<typeof createUseStyles> = createUseStyles({
  menuBackgroundColor: {
    '& .ant-menu-submenu-selected .ant-menu-submenu-title': {
      backgroundColor: 'var(--ant-menu-item-selected-bg)',
    },
  },
});
