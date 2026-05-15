import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'hu', 'de', 'it', 'fr', 'es', 'sk'],
  defaultLocale: 'en'
});
