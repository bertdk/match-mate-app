import { component$ } from '@builder.io/qwik';
import type { RouteLocation } from '@builder.io/qwik-city';

interface Props {
  locale: string;
  location: RouteLocation;
  language: string;
}

export const LocaleLink = component$<Props>(
  ({ locale, location, language }) => {
    const isActiveLocale = locale === location.params.locale;
    return (
      <a
        class={`px-8 py-4 hover:cursor-pointer hover:bg-blue-100 hover:text-blue-500 ${
          isActiveLocale ? 'text-blue-700' : 'text-inherit visited:text-inherit'
        }`}
        href={`/${locale}${location.url.pathname.slice(3)}${
          location.url.search
        }`}
      >
        {isActiveLocale && '✔︎ '}
        {language}
      </a>
    );
  },
);
