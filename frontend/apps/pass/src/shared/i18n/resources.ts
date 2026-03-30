import ruCommon from '@/locales/ru/common.json'
import ruHome from '@/locales/ru/home.json'
import ruMeta from '@/locales/ru/meta.json'
import ruAuth from '@/locales/ru/auth.json'

import enCommon from '@/locales/en/common.json'
import enHome from '@/locales/en/home.json'
import enMeta from '@/locales/en/meta.json'
import enAuth from '@/locales/en/auth.json'

// TODO: как-то бы динамически это решать, чтоб в папку положил и работает
export const resources = {
  ru: { common: ruCommon, home: ruHome, meta: ruMeta, auth: ruAuth },
  en: { common: enCommon, home: enHome, meta: enMeta, auth: enAuth },
} as const
