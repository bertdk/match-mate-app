import type { Signal } from '@builder.io/qwik';
import { component$, useOnDocument, useSignal, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { LocaleLink } from './localeLink';
import { locales } from '~/utils/i18n-utils';
import { HiChevronDownOutline } from '@qwikest/icons/heroicons';

function useClick(ref: Signal<HTMLDialogElement | undefined>) {
  useOnDocument(
    'click',
    $(() => ref.value?.close()),
  );
}

export const LocaleMenu = component$(() => {
  const loc = useLocation();
  const ref = useSignal<HTMLDialogElement>();
  useClick(ref);

  return (
    <div class="flex">
      <button
        class={`max-w-fit rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
        onClick$={(_, e) => {
          if (!ref.value) return;
          console.log({
            right: window.innerWidth - e.offsetLeft - e.offsetWidth,
          });
          ref.value.style.minWidth = `${e.offsetWidth}px`;
          ref.value.style.top = `${e.offsetTop}px`;
          ref.value.showModal();
          ref.value.style.left = `${
            e.offsetLeft + e.offsetWidth - ref.value.offsetWidth
          }px`;
        }}
      >
        <div class={`flex flex-row items-center space-x-1`}>
          {<span>{$localize`Language`}</span>}
          <HiChevronDownOutline />
        </div>
      </button>
      <dialog
        class={`absolute m-0 max-w-fit rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 shadow-xl focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
        ref={ref}
      >
        <div class="flex flex-col">
          {locales.map((l) => (
            <LocaleLink
              locale={l.translate.locale}
              location={loc}
              key={l.fullName}
              language={l.fullName}
            />
          ))}
        </div>
      </dialog>
    </div>
  );
});
