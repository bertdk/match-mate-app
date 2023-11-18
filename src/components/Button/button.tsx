import type { ButtonHTMLAttributes } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button = component$<Props>(({ text, ...props }) => {
  return (
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      {...props}
    >
      {text}
    </button>
  );
});
