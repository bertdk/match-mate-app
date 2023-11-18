import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { getTournaments } from "~/data/tournaments.api";

export const useTournamentsData = routeLoader$(async () => {
  return getTournaments();
});

export default component$(() => {
  const { items: tournaments } = useTournamentsData().value;
  const loc = useLocation();

  return (
    <>
      <div class="mx-4 flex flex-row justify-between">
        <h1 class="text-xl m-0">Tournaments overview</h1>
        <Link
          href={`/tournaments/${loc.params.tournamentId}/games`}
          class="flex items-center"
        >
          New game
        </Link>
      </div>
      {tournaments.map((tournament) => (
        <Link
          href={`/tournaments/${tournament.id}`}
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
  title: `Tournaments overview`,
};
