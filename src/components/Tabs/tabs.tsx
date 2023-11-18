import type { HTMLAttributes, JSXChildren } from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { TabItem, TabsOptions } from "flowbite";
import { Tabs as FlowTabs } from "flowbite";

interface Props extends HTMLAttributes<HTMLDivElement> {
  tabs: { id: string; label: string; child: JSXChildren }[];
}

export const Tabs = component$((props: Props) => {
  const tabsElement = useSignal<HTMLElement>();
  const tabElements = useSignal<TabItem[]>();
  const inputTabs = props.tabs.map((x) => ({ id: x.id, label: x.label }));

  useVisibleTask$(() => {
    tabElements.value = inputTabs.map((tab) => ({
      id: tab.id,
      triggerEl: document.querySelector(`#${tab.id}-tab`) as HTMLElement,
      targetEl: document.querySelector(`#${tab.id}-target`) as HTMLElement,
    }));
    const options: TabsOptions = {
      defaultTabId: inputTabs[0].id,
      activeClasses:
        "text-blue-700 hover:text-blue-500 border-blue-700 hover:border-blue-500",
      inactiveClasses:
        "text-zinc-700 hover:text-zinc-500 border-zinc-700 hover:border-zinc-500",
    };

    new FlowTabs(tabsElement.value, tabElements.value, options);
  });

  return (
    <>
      <div class="text-sm font-medium text-center text-zinc-500">
        <ul
          class="flex -mb-px p-0 list-none"
          id="tabs-parent"
          role="tablist"
          ref={tabsElement}
        >
          {props.tabs.map((tab) => (
            <li class="w-full p-0" role="presentation" key={tab.id}>
              <button
                class="inline-block w-full p-4 border-b-2 rounded-t-lg"
                id={`${tab.id}-tab`}
                type="button"
                role="tab"
                aria-controls={`${tab.id}-target`}
                aria-selected="false"
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id="tabContentExample">
        {props.tabs.map((tab) => (
          <div
            class="hidden p-4 rounded-lg bg-zinc-50"
            id={`${tab.id}-target`}
            key={`${tab.id}-target`}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
          >
            {tab.child}
          </div>
        ))}
      </div>
    </>
  );
});
