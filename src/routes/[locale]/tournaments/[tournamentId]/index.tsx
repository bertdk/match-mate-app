import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { Tabs } from '@components';
import type { TournamentGame } from '~/data/games.api';
import { getGames } from '~/data/games.api';
import { getRanking, getTournament } from '~/data/tournaments.api';
import { urls } from '~/utils/urls';

export const useTournamentData = routeLoader$(async (requestEvent) => {
  return getTournament(requestEvent.params.tournamentId);
});

export const useTournamentRanking = routeLoader$(async (requestEvent) => {
  return getRanking(requestEvent.params.tournamentId);
});

export const useTournamentGames = routeLoader$(async (requestEvent) => {
  return getGames(requestEvent.params.tournamentId);
});

export default component$(() => {
  const tournament = useTournamentData().value;
  const ranking = useTournamentRanking().value;
  const games = useTournamentGames().value;
  const loc = useLocation();

  return (
    <>
      <div class="mx-4 flex flex-row justify-between">
        <h1 class="m-0 text-xl">{tournament.name}</h1>
        <Link
          href={urls.games(loc.params.tournamentId)}
          class="flex items-center"
        >
          {$localize`New game`}
        </Link>
      </div>
      <Link
        href={urls.tournamentEdit(loc.params.tournamentId)}
        class="items-center"
      >
        {$localize`Edit`}
      </Link>
      <Tabs
        tabs={[
          {
            id: 'raking',
            label: $localize`Ranking`,
            child: ranking.items.map((item, i) => (
              <div key={item.id} class="mb-4 flex flex-row last:mb-0">
                <p class="w-1/6">{i + 1}</p>
                <p class="w-2/3">{item.name}</p>
                <p class="w-1/6 text-right">{item.points}</p>
              </div>
            )),
          },
          {
            id: 'scores',
            label: $localize`Scores`,
            child: games.items.map((game) => (
              <Score game={game} key={game.id} />
            )),
          },
        ]}
      />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const tournament = resolveValue(useTournamentData);
  return {
    title: $localize`Tournament "${tournament.name}"`,
    meta: [
      {
        name: 'id',
        content: params.tournamentId,
      },
    ],
  };
};

interface ScoreProps {
  game: TournamentGame;
}
const Score = component$(({ game }: ScoreProps) => {
  return (
    <div key={game.id} class="border-b-2 border-zinc-400 p-2 last:border-none">
      {game.scores.map((score) => (
        <div key={score.id}>
          <div
            class={`flex justify-between ${
              Number(score.gamePoints) ===
                Math.max(...game.scores.map((x) => x.gamePoints)) && 'font-bold'
            }`}
          >
            <p class="w-4/5">{score.player.name}</p>
            <p class="w-1/5 text-right">{score.gamePoints}</p>
          </div>
        </div>
      ))}
    </div>
  );
});
