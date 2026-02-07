/**
 * Константы и утилиты интернационализации.
 */

export const LOCALES = ['ru', 'en'] as const;

export type ILocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: ILocale = 'ru';

export function isLocale(value: string): value is ILocale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Определяет локаль по первому сегменту pathname.
 * `/en/about` → 'en', `/about` → 'ru' (дефолт).
 */
export function detectLocale(pathname: string): ILocale {
  const segment = pathname.split('/')[1];
  if (segment && isLocale(segment) && segment !== DEFAULT_LOCALE) {
    return segment;
  }
  return DEFAULT_LOCALE;
}
