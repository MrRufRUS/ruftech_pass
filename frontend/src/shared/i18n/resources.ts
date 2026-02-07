import ruCommon from '@/locales/ru/common.json';
import ruHome from '@/locales/ru/home.json';
import ruMeta from '@/locales/ru/meta.json';

import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import enMeta from '@/locales/en/meta.json';

export const resources = {
  ru: { common: ruCommon, home: ruHome, meta: ruMeta },
  en: { common: enCommon, home: enHome, meta: enMeta },
} as const;
