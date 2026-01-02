import enUS from 'antd/locale/en_US';
import zhTW from 'antd/locale/zh_TW';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getEnUsLang, getZhTwLang } from './helper';
import type { Locale } from 'antd/lib/locale';

export type LanguageType = 'zh-TW' | 'en-US';

export const ANT_DESIGN_LOCALE: Record<string, Locale> = {
  'zh-TW': zhTW,
  'en-US': enUS,
};

export const i18n = i18next.use(initReactI18next);

export function setupI18n() {
  i18n.init({
    lng: navigator.language,
    fallbackLng: 'en-US',
    resources: {
      'zh-TW': { translation: getZhTwLang() },
      'en-US': { translation: getEnUsLang() },
    },
  });
}
