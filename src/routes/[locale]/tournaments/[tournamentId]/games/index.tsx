import { component$, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  Form,
  routeAction$,
  routeLoader$,
  useLocation,
  useNavigate,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { BasicInput, Button, SelectInput } from '@components';
import { createGame } from '~/data/games.api';
import { getPlayers } from '~/data/players.api';
import { urls } from '~/utils/urls';

const formSchema = {
  scores: z.array(
    z.object({
      playerId: z.string().uuid(),
      gamePoints: z.coerce.number().min(0).max(100),
    }),
  ),
};

export const usePlayersData = routeLoader$(async (requestEvent) => {
  return getPlayers(requestEvent.params.tournamentId);
});

export const useCreateTournament = routeAction$(async (input, requestEvent) => {
  return createGame(requestEvent.params.tournamentId, input);
}, zod$(formSchema));

export default component$(() => {
  const action = useCreateTournament();
  const nav = useNavigate();
  const loc = useLocation();
  const players = usePlayersData().value.items.map((player) => ({
    value: player.id,
    label: player.name,
  }));
  useTask$(({ track }) => {
    track(() => action.value?.id);
    if (action.value?.id) {
      nav(urls.tournament(loc.params.tournamentId));
    }
  });

  return (
    <>
      <h1 class="text-xl">{$localize`Create game`}</h1>
      <Form action={action} class="flex flex-col">
        <SelectInput
          label={$localize`Player 1`}
          id="scores.0.playerId"
          options={players}
        />
        <BasicInput
          text={$localize`Points`}
          id="scores.0.gamePoints"
          type="number"
        />
        <SelectInput
          label={$localize`Player 2`}
          id="scores.1.playerId"
          options={players}
        />
        <BasicInput
          text={$localize`Points`}
          id="scores.1.gamePoints"
          type="number"
        />
        <div class="place-self-end">
          <Button text={$localize`Submit`} type="submit" />
        </div>
      </Form>

      {action.value && !action.value.failed && (
        <p>{$localize`Game ${action.value.id} created successfully`}</p>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: $localize`Create game`,
};
