import { formatMoney } from '@/utils/common';
// import { Tag } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import type { TFunction } from 'i18next';

export function Columns(t: TFunction<'translation'>): ProColumns[] {
  return [
    {
      dataIndex: 'index',
      title: t('common.index'),
      valueType: 'indexBorder',
      width: 60,
      align: 'center',
    },
    {
      title: t('common.itemNumber'),
      dataIndex: 'itemNumber',
      disable: true,
      ellipsis: true,
      width: 120,
      align: 'center',
      fieldProps: {
        placeholder: t('common.placeholder.itemNumber'),
      },
    },
    {
      disable: true,
      title: t('common.productName'),
      dataIndex: 'productName',
      width: 120,
      ellipsis: true,
      align: 'center',
      fieldProps: {
        placeholder: t('common.placeholder.productName'),
      },
    },
    {
      title: t('common.unit'),
      dataIndex: 'unit',
      width: 80,
      search: false,
      align: 'center',
    },
    {
      title: t('common.quantity'),
      dataIndex: 'quantity',
      valueType: 'digit',
      width: 100,
      search: false,
      align: 'center',
    },
    {
      title: t('common.unitPrice'),
      dataIndex: 'unitPrice',
      width: 170,
      search: false,
      align: 'center',
      renderText: formatMoney,
    },
    {
      title: t('common.totalPrice'),
      dataIndex: 'totalPrice',
      width: 170,
      search: false,
      align: 'center',
      renderText: formatMoney,
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
