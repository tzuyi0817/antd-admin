import { LoadingOutlined } from '@ant-design/icons';
import { ProTable, type ActionType } from '@ant-design/pro-components';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchHomeList } from '@/services/http';
import { Columns } from './components/columns';

export default function Home() {
  const { t } = useTranslation();
  const actionRef = useRef<ActionType>(null);

  const columns = useMemo(() => Columns(t), [t]);

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
        loading={{ indicator: <LoadingOutlined spin /> }}
        search={{
          labelWidth: 'auto',
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
    </div>
  );
}
