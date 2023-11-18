import type { HTMLAttributes } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export const Heading = component$<Props>(({ text, ...props }) => {
  return (
    <h1 class="text-5xl font-extrabold dark:text-white" {...props}>
      {text}
    </h1>
  );
});
