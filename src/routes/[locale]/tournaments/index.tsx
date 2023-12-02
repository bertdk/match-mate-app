import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { HiPlusCircleOutline } from '@qwikest/icons/heroicons';
import { getTournaments } from '~/data/tournaments.api';
import { urls } from '~/utils/urls';

export const useTournamentsData = routeLoader$(async () => {
  return getTournaments();
});

export default component$(() => {
  const { items: tournaments } = useTournamentsData().value;

  return (
    <>
      <div class="mx-0 flex flex-row justify-between pb-2">
        <h1 class="m-0 text-xl">{$localize`Tournaments overview`}</h1>
        <Link href={urls.tournamentCreate} class="flex items-center">
          <HiPlusCircleOutline class="h-6 w-auto" />
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
      {tournaments.length === 0 && (
        <Link
          href={urls.tournamentCreate}
        >{$localize`Create the first tournament`}</Link>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: $localize`Tournaments overview`,
};
