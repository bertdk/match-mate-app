import type { HTMLAttributes } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange$'>,
    Pick<HTMLAttributes<HTMLSelectElement>, 'onChange$'> {
  id: string;
  label?: string;
  options: { value?: string; label: string }[];
  showEmpty?: boolean;
}

export const SelectInput = component$(
  ({ id, label, options, class: divClass, showEmpty, onChange$ }: Props) => {
    return (
      <div class={`mb-2 ${divClass}`}>
        {label && (
          <label
            for={id}
            class="block text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <select
          id={id}
          name={id}
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          // eslint-disable-next-line qwik/valid-lexical-scope
          onChange$={onChange$}
        >
          {showEmpty && <option></option>}
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
