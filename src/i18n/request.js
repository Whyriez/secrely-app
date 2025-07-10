// src/i18n.js
import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers"; // Import headers

export default getRequestConfig(async () => {
  // Ambil header 'Accept-Language' dari request
  const languages = headers().get("Accept-Language") || "en";

  const locale = languages.split(',')[0].split('-')[0] || 'en';

  const supportedLocales = ['en', 'id'];
  const finalLocale = supportedLocales.includes(locale) ? locale : 'en';

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default,
  };
});