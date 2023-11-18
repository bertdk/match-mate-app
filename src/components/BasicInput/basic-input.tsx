import type { InputHTMLAttributes } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

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
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name={name ?? props.id}
          {...props}
        />
        <p class="text-red-500 text-xs italic">{error}</p>
      </div>
    );
  }
);
