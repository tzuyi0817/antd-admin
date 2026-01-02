// import { Tag } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import type { TFunction } from 'i18next';

export function Columns(t: TFunction<'translation'>): ProColumns[] {
  return [
    {
      dataIndex: 'index',
      title: t('common.index'),
      valueType: 'indexBorder',
      width: 80,
    },
    {
      title: t('common.itemNumber'),
      dataIndex: 'itemNumber',
      disable: true,
      ellipsis: true,
      width: 120,
    },
    {
      disable: true,
      title: t('common.productName'),
      dataIndex: 'productName',
      width: 120,
      filters: true,
      onFilter: true,
      ellipsis: true,
    },
    {
      title: t('common.unit'),
      dataIndex: 'unit',
      width: 80,
      search: false,
    },
    {
      title: t('common.quantity'),
      dataIndex: 'quantity',
      valueType: 'digit',
      width: 100,
      search: false,
    },
    {
      title: t('common.unitPrice'),
      dataIndex: 'unitPrice',
      valueType: 'money',
      width: 170,
      search: false,
    },
    {
      title: t('common.totalPrice'),
      dataIndex: 'totalPrice',
      valueType: 'money',
      width: 170,
      search: false,
    },
    // {
    //   disable: true,
    //   title: t('common.status'),
    //   dataIndex: 'status',
    //   valueType: 'select',
    //   width: 80,
    //   render: (text, record) => {
    //     return <Tag color={record.status === 1 ? 'success' : 'default'}>{text}</Tag>;
    //   },
    //   valueEnum: {
    //     1: {
    //       text: t('common.enabled'),
    //     },
    //     0: {
    //       text: t('common.deactivated'),
    //     },
    //   },
    // },
  ];
}
