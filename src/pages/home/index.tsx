import { useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProTable, type ActionType } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeList } from '@/services/http';
import { Columns } from './components/columns';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation();
  const actionRef = useRef<ActionType>(null);

  const { data, isFetching } = useQuery({
    queryKey: ['home-list', page, pageSize],
    queryFn: () => {
      return fetchHomeList(page, pageSize);
    },
  });

  const columns = useMemo(() => {
    return Columns(t);
  }, []);

  function refreshTable() {
    actionRef.current?.reload();
  }

  return (
    <div className="box-border p-4">
      <ProTable
        cardBordered
        rowKey="id"
        dataSource={data?.resultMap?.list}
        dateFormatter="string"
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }}
        loading={isFetching}
        onSubmit={() => {
          setPage(1);
        }}
        pagination={{
          position: ['bottomRight'],
          current: page,
          pageSize,
          total: data?.resultMap?.total,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: (current, size) => {
            setPage(current);
            setPageSize(size);
          },
          showTotal: total => t('common.pagination', { total }),
        }}
      />
    </div>
  );
}
