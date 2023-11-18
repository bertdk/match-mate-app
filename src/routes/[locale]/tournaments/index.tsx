import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getTournaments } from '~/data/tournaments.api';
import { urls } from '~/utils/urls';

export const useTournamentsData = routeLoader$(async () => {
  return getTournaments();
});

export default component$(() => {
  const { items: tournaments } = useTournamentsData().value;
  const loc = useLocation();

  return (
    <>
      <div class="mx-4 flex flex-row justify-between">
        <h1 class="m-0 text-xl">{$localize`Tournaments overview`}</h1>
        <Link
          href={urls.games(loc.params.tournamentId)}
          class="flex items-center"
        >
          {$localize`New game`}
        </Link>
      </div>
      {tournaments.map((tournament) => (
        <Link
          href={urls.tournament(tournament.id)}
          class="items-center"
          key={tournament.id}
        >
          {tournament.name}
        </Link>
      ))}
    </>
  );
});

export const head: DocumentHead = {
  title: $localize`Tournaments overview`,
};
