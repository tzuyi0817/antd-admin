import type { LanguageType } from '@/plugins/i18n';
import type { ButtonProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';
import { LANGUAGE_LIST } from './constants';

export function LanguageSwitcher({ ...restProps }: ButtonProps) {
  const { i18n } = useTranslation();

  function handleChangeLanguage(locale: LanguageType) {
    i18n.changeLanguage(locale);
  }

  function onClick({ key }: { key: string }) {
    handleChangeLanguage(key as LanguageType);
  }

  return (
    <Dropdown
      menu={{
        items: LANGUAGE_LIST,
        onClick,
        selectable: true,
        selectedKeys: [i18n.language],
        className: 'whitespace-nowrap',
      }}
      trigger={['click']}
      arrow={false}
      placement="bottom"
      popupRender={menu => <div style={{ marginRight: 8 }}>{menu}</div>}
    >
      <Button
        type="text"
        {...restProps}
      >
        <TranslationOutlined />
      </Button>
    </Dropdown>
  );
}
