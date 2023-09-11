import en from './en';
import type { TranslationsType } from '../../src/types';

export const translations: TranslationsType = {
  en,
};

export const t = (
  code: string,
  language?: string,
  newTranslations?: TranslationsType,
  defaultValue?: string,
  params?: { [key: string]: string }
): string => {
  const extendedTranslations = {
    ...translations,
    ...(newTranslations ? newTranslations : {}),
  };
  const lang = language ?? 'en';
  let finalValue = '';
  if (extendedTranslations[lang] && extendedTranslations[lang]![code]) {
    finalValue = extendedTranslations[lang]![code]!;
  } else {
    finalValue = defaultValue ?? code;
  }
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      finalValue = finalValue.split(`{{${key}}}`).join(value);
    }
  }
  return finalValue;
};
