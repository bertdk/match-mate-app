import type { LabelHTMLAttributes } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  text?: string;
  error?: string[];
  isSubLabel?: boolean;
}

export const InputLabel = component$<Props>(
  ({ text, error, isSubLabel, ...props }) => {
    return (
      <label
        for={props.for}
        class={`block text-sm ${isSubLabel ? `font-normal` : `font-medium`} ${
          error ? `text-red-500` : `text-gray-900 dark:text-white`
        }`}
      >
        {text}
      </label>
    );
  },
);
