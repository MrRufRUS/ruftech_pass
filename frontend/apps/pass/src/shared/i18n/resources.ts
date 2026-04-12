import ruCommon from '@/locales/ru/common.json'
import ruHome from '@/locales/ru/home.json'
import ruMeta from '@/locales/ru/meta.json'
import ruAuth from '@/locales/ru/auth.json'
import ruDashboard from '@/locales/ru/dashboard.json'

import enCommon from '@/locales/en/common.json'
import enHome from '@/locales/en/home.json'
import enMeta from '@/locales/en/meta.json'
import enAuth from '@/locales/en/auth.json'
import enDashboard from '@/locales/en/dashboard.json'

// TODO: как-то бы динамически это решать, чтоб в папку положил и работает
export const resources = {
  ru: { common: ruCommon, home: ruHome, meta: ruMeta, auth: ruAuth, dashboard: ruDashboard },
  en: { common: enCommon, home: enHome, meta: enMeta, auth: enAuth, dashboard: enDashboard },
} as const
