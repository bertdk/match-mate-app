import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  Form,
  routeAction$,
  useNavigate,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { BasicInput, Button, ButtonType, InputLabel } from '@components';
import { createTournament } from '~/data/tournaments.api';
import { urls } from '~/utils/urls';

const formSchema = {
  name: z.string().min(1).max(255),
  pointsOnWin: z.coerce.number().min(0).max(100),
  pointsOnTie: z.coerce.number().min(0).max(100),
  pointsOnLoss: z.coerce.number().min(0).max(100),
  players: z.array(
    z.object({
      name: z.string(),
    }),
  ),
};
export const useCreateTournament = routeAction$(async (input) => {
  return createTournament(input);
}, zod$(formSchema));

export default component$(() => {
  const nav = useNavigate();
  const action = useCreateTournament();
  const playersCount = useSignal(0);
  const ref = useSignal<HTMLInputElement>();

  useTask$(({ track }) => {
    track(() => action.value?.name);
    if (action.value?.name) {
      nav(urls.tournament(action.value.id));
    }
  });

  useTask$(({ track }) => {
    track(() => ref.value?.id);
    ref.value?.focus();
  });

  return (
    <>
      <h1 class="m-0 text-xl">{$localize`Create tournament`}</h1>
      <Form action={action} class="flex flex-col space-y-2">
        <BasicInput
          text={$localize`Tournament name`}
          id="name"
          placeholder={$localize`Enter the tournament name`}
          type="text"
          error={action.value?.fieldErrors?.name}
          autoFocus
        />
        <div>
          <InputLabel text={$localize`Point distribution`} />
          <div class="flex items-end justify-between">
            <BasicInput
              text={$localize`Win`}
              id="pointsOnWin"
              type="number"
              error={action.value?.fieldErrors?.pointsOnWin}
              isSubLabel
            />
            <BasicInput
              text={$localize`Tie`}
              id="pointsOnTie"
              type="number"
              error={action.value?.fieldErrors?.pointsOnTie}
              isSubLabel
            />
            <BasicInput
              text={$localize`Loss`}
              id="pointsOnLoss"
              type="number"
              error={action.value?.fieldErrors?.pointsOnLoss}
              isSubLabel
            />
          </div>
        </div>
        <div>
          <InputLabel text={$localize`Players`} />
          <div class="flex flex-col justify-between">
            {new Array(playersCount.value).fill(null).map((_, index) => (
              <BasicInput
                key={index}
                text={$localize`Player ${index + 1}`}
                id={`players.${index}.name`}
                type="text"
                isSubLabel
                ref={ref}
              />
            ))}
            <Button
              text={$localize`Add player`}
              onClick$={() => playersCount.value++}
              type="button"
              variation={ButtonType.Secondary}
            >{$localize`New player`}</Button>
          </div>
        </div>
        <div class="place-self-end">
          <Button text={$localize`Save`} type="submit" />
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
