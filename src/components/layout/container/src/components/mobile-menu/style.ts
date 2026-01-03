import { createUseStyles } from 'react-jss';

export const useStyles: ReturnType<typeof createUseStyles> = createUseStyles({
  drawerStyles: {
    '& .ant-drawer-body': {
      padding: 0,
      '&>ul': {
        paddingTop: '1em',
      },
    },
    '& .ant-drawer-header': {
      display: 'none',
    },
  },
});
