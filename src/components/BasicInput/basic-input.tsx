import type { InputHTMLAttributes } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  text?: string;
  error?: string[];
}

export const BasicInput = component$<Props>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ text, error, name, children: _, key, ...props }) => {
    return (
      <div class="mb-2" key={key}>
        {text && (
          <label
            for={props.id}
            class="block text-sm font-medium text-gray-900 dark:text-white"
          >
            {text}
          </label>
        )}
        <input
          class={`block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
            props.type === 'number' ? 'w-16' : 'w-full'
          }`}
          name={name ?? props.id}
          {...props}
        />
        <p class="text-xs italic text-red-500">{error}</p>
      </div>
    );
  },
);
