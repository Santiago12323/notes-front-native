import { type Locale } from '../locales';
import { type Messages } from '../types';
import { en } from './en';
import { es } from './es';

export const translations: Record<Locale, Messages> = {
  en,
  es,
};
