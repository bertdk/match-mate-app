import { component$, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  Form,
  routeAction$,
  useNavigate,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { BasicInput, Button } from '@components';
import { createTournament } from '~/data/tournaments.api';
import { urls } from '~/utils/urls';

const formSchema = {
  name: z.string().min(1).max(255),
  pointsOnWin: z.coerce.number().min(0).max(100),
  pointsOnTie: z.coerce.number().min(0).max(100),
  pointsOnLoss: z.coerce.number().min(0).max(100),
};
export const useCreateTournament = routeAction$(async (input) => {
  return createTournament(input);
}, zod$(formSchema));

export default component$(() => {
  const nav = useNavigate();
  const action = useCreateTournament();

  useTask$(({ track }) => {
    track(() => action.value?.name);
    if (action.value?.name) {
      nav(urls.tournament(action.value.id));
    }
  });

  return (
    <>
      <h1 class="m-0 text-xl">{$localize`Create tournament`}</h1>
      <Form action={action} class="flex flex-col space-y-2">
        <BasicInput
          text={$localize`Name`}
          id="name"
          placeholder={$localize`Enter the tournament name`}
          type="text"
          error={action.value?.fieldErrors?.name}
          autoFocus
        />
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white">
            {$localize`Point distribution after a match`}
          </label>
          <div class="flex items-end justify-between">
            <BasicInput
              text={$localize`Win`}
              id="pointsOnWin"
              type="number"
              error={action.value?.fieldErrors?.pointsOnWin}
            />
            <BasicInput
              text={$localize`Tie`}
              id="pointsOnTie"
              type="number"
              error={action.value?.fieldErrors?.pointsOnTie}
            />
            <BasicInput
              text={$localize`Loss`}
              id="pointsOnLoss"
              type="number"
              error={action.value?.fieldErrors?.pointsOnLoss}
            />
          </div>
        </div>
        <div class="place-self-end">
          <Button text={$localize`Submit`} type="submit" />
        </div>
      </Form>

      {action.value && !action.value.failed && (
        <p>{$localize`Tournament ${action.value.name} created successfully`}</p>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: $localize`Create tournament`,
};
