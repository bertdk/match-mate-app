import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import {
  Form,
  routeAction$,
  routeLoader$,
  useNavigate,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { BasicInput, Button } from '@components';
import { getPlayers } from '~/data/players.api';
import { getTournament, updateTournament } from '~/data/tournaments.api';
import { urls } from '~/utils/urls';

export const usePlayersData = routeLoader$(async (requestEvent) => {
  return getPlayers(requestEvent.params.tournamentId);
});

export const useTournamentData = routeLoader$(async (requestEvent) => {
  return getTournament(requestEvent.params.tournamentId);
});

const formSchema = {
  name: z.string(),
  players: z.array(
    z.object({
      id: z.string().uuid().optional(),
      name: z.string(),
    }),
  ),
};

export const useUpdateTournament = routeAction$(async (input, requestEvent) => {
  return updateTournament(requestEvent.params.tournamentId, input);
}, zod$(formSchema));

export default component$(() => {
  const players = usePlayersData();
  const tournament = useTournamentData();
  const action = useUpdateTournament();
  const initialPlayerCount = players.value.items.length;
  const countExtraFields = useSignal(
    players.value.count - initialPlayerCount + 1,
  );
  const nav = useNavigate();

  useTask$(({ track }) => {
    track(() => action.value?.id);
    if (action.value?.id) {
      nav(urls.tournament(action.value.id));
    }
  });

  return (
    <Form action={action} class="flex flex-col space-y-2">
      <h1 class="m-0 text-xl">{tournament.value.name}</h1>
      <BasicInput
        id="name"
        text={$localize`Tournament name`}
        value={tournament.value.name}
      />
      {players.value.items.map((player, i) => (
        <div key={`existing-${player.id}`}>
          <BasicInput
            key={`${player.id}-id`}
            id={`players.${i}.id`}
            value={player.id}
            type="hidden"
          />
          <BasicInput
            key={`${player.id}-name`}
            id={`players.${i}.name`}
            text={$localize`Player ${i + 1}`}
            value={player.name}
          />
        </div>
      ))}
      {[...Array(countExtraFields.value)].map((_, i) => (
        <BasicInput
          key={`new-player-${i}`}
          id={`players.${initialPlayerCount + i}.name`}
          text={$localize`Player ${initialPlayerCount + i + 1}`}
          onChange$={() =>
            i === countExtraFields.value - 1 && countExtraFields.value++
          }
        />
      ))}
      <div class="place-self-end">
        <Button text={$localize`Save`} type="submit" />
      </div>
    </Form>
  );
});
