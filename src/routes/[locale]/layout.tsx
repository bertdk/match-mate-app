import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { extractLang, useI18n } from '~/utils/i18n-utils';

const locales = new Set(['en', 'nl']);
export const onGet: RequestHandler = async ({
  request,
  url,
  redirect,
  pathname,
  params,
  locale,
}) => {
  const currentLocale = params.locale.toLowerCase();
  if (locales.has(currentLocale)) {
    // Set the locale for this request
    locale(currentLocale);
  } else {
    // Redirect to the correct locale
    const guessedLocale = extractLang(request, url);
    let path;
    if (
      currentLocale === '__' ||
      /^[a-z][a-z](-[a-z][a-z])?/i.test(currentLocale)
    ) {
      // invalid locale
      // TODO a better way to replace the locale parameter that supports a base path
      path = '/' + pathname.split('/').slice(2).join('/');
    } else {
      // no locale
      path = pathname;
    }
    throw redirect(301, `/${guessedLocale}${path}${url.search}`);
  }
};

export default component$(() => {
  useI18n();
  return (
    <>
      <main class="px-4 py-6">
        <section>
          <Slot />
        </section>
      </main>
      <footer></footer>
    </>
  );
});
