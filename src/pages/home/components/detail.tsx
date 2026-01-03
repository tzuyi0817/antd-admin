import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getMessage } from '@/providers/message';
import { createHomeItem, editHomeItem, type HomeItem } from '@/services/http';

interface DetailProps {
  title: React.ReactNode;
  open: boolean;
  detailData: Partial<HomeItem>;
  onCloseChange: () => void;
  refreshTable?: () => void;
}

export function Detail({ title, open, onCloseChange, detailData, refreshTable }: DetailProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm<HomeItem>();

  async function onFinish(values: HomeItem) {
    const message = getMessage();

    if (detailData.id) {
      await editHomeItem({ ...detailData, ...values });

      message.success(t('common.updateSuccess'));
    } else {
      await createHomeItem(values);
      message.success(t('common.addSuccess'));
    }

    refreshTable?.();

    return true;
  }

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData);
    }
  }, [open]);

  return (
    <ModalForm<HomeItem>
      title={title}
      open={open}
      onOpenChange={visible => {
        if (visible === false) {
          form.resetFields();
          onCloseChange();
        }
      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      form={form}
      autoFocusFirstInput
      onFinish={onFinish}
    >
      <ProFormText
        allowClear
        rules={[
          {
            required: true,
          },
        ]}
        width="md"
        name="itemNumber"
        label={t('common.itemNumber')}
      />

      <ProFormText
        allowClear
        rules={[
          {
            required: true,
          },
        ]}
        width="md"
        name="productName"
        label={t('common.productName')}
      />

      <ProFormText
        allowClear
        rules={[
          {
            required: true,
          },
        ]}
        width="md"
        name="unit"
        label={t('common.unit')}
      />

      <ProFormText
        allowClear
        rules={[
          {
            required: true,
          },
        ]}
        width="md"
        name="quantity"
        label={t('common.quantity')}
      />

      <ProFormText
        allowClear
        rules={[
          {
            required: true,
          },
        ]}
        width="md"
        name="unitPrice"
        label={t('common.unitPrice')}
      />
    </ModalForm>
  );
}
