import type { RequestHandler } from '@builder.io/qwik-city';
import { extractLang } from '~/utils/i18n-utils';

export const onGet: RequestHandler = async ({ request, redirect, url }) => {
  const guessedLocale = extractLang(request, url);
  throw redirect(301, `/${guessedLocale}/${url.search}`);
};
