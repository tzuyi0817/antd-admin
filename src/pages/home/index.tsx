import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ProTable, type ActionType, type ProColumns, type ProCoreActionType } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMessage } from '@/providers/message';
import { deleteHomeItem, fetchHomeList, type HomeItem } from '@/services/http';
import { Columns } from './components/columns';
import { Detail } from './components/detail';

export default function Home() {
  const { t } = useTranslation();
  const actionRef = useRef<ActionType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [detailData, setDetailData] = useState<Partial<HomeItem>>({});

  const columns: ProColumns[] = useMemo(() => {
    return [
      ...Columns(t),
      {
        title: t('common.action'),
        valueType: 'option',
        key: 'option',
        width: 120,
        fixed: 'right',
        align: 'center',
        render: (_reactNode, record: HomeItem, _index, action) => {
          return (
            <div className="flex justify-center">
              <Button
                key="editable"
                type="link"
                size="small"
                onClick={() => {
                  setTitle(t('common.update'));
                  setDetailData({ ...record });
                  setIsOpen(true);
                }}
              >
                {t('common.edit')}
              </Button>

              <Popconfirm
                key="delete"
                title={t('common.confirmDelete')}
                onConfirm={() => handleDelete(record.id, action)}
                cancelText={t('common.cancel')}
                okText={t('common.confirm')}
              >
                <Button
                  type="link"
                  size="small"
                >
                  {t('common.delete')}
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
  }, [t]);

  async function handleDelete(id: number, action?: ProCoreActionType<object>) {
    await deleteHomeItem(id);

    const message = getMessage();

    message.success(t('common.deleteSuccess'));
    await action?.reload?.();
  }

  function onCloseChange() {
    setIsOpen(false);
    setDetailData({});
  }

  function refreshTable() {
    actionRef.current?.reload();
  }

  return (
    <div className="box-border p-4">
      <ProTable
        cardBordered
        rowKey="id"
        dateFormatter="string"
        columns={columns}
        actionRef={actionRef}
        request={async params => {
          const { current, pageSize, ...rest } = params;
          const page = current ?? 1;
          const size = pageSize ?? 10;
          const { resultMap } = await fetchHomeList({ page, pageSize: size, ...rest });

          return { ...resultMap, data: resultMap.list };
        }}
        scroll={{ x: 'max-content' }}
        toolBarRender={() => [
          <Button
            key="add"
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => {
              setIsOpen(true);
              setTitle(t('common.add'));
            }}
          >
            {t('common.add')}
          </Button>,
        ]}
        loading={{ indicator: <LoadingOutlined spin /> }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        pagination={{
          placement: ['bottomEnd'],
          defaultCurrent: 1,
          defaultPageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: total => t('common.pagination', { total }),
        }}
      />

      <Detail
        title={title}
        open={isOpen}
        onCloseChange={onCloseChange}
        detailData={detailData}
        refreshTable={refreshTable}
      />
    </div>
  );
}
