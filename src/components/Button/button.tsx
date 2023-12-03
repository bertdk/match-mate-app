import type { ButtonHTMLAttributes } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variation?: ButtonType;
}

export const Button = component$<Props>(
  ({ text, variation, class: classStyle, ...props }) => {
    return (
      <button
        class={`rounded-lg px-5 py-2.5 text-sm font-medium ${
          variation === ButtonType.Secondary
            ? `border-2 border-blue-700 text-blue-700 hover:border-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300`
            : `bg-blue-700 text-white`
        } ${classStyle}
      `}
        {...props}
      >
        {text}
      </button>
    );
  },
);
