import { component$ } from "@builder.io/qwik";

interface Props {
  id: string;
  label: string;
  options: { value?: string; label: string }[];
}

export const SelectInput = component$(({ id, label, options }: Props) => {
  return (
    <div class="mb-2">
      <label
        for={id}
        class="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option></option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});
