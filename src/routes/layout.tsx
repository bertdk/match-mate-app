import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
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
