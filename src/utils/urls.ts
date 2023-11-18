const localizePrefix = $localize`/__/`;

const tournamentCreate = `${localizePrefix}tournaments/create`;
const tournaments = `${localizePrefix}tournaments`;
const tournament = (tournamentId: string) =>
  `${localizePrefix}tournaments/${tournamentId}`;
const games = (tournamentId: string) =>
  `${localizePrefix}tournaments/${tournamentId}/games`;
const tournamentEdit = (tournamentId: string) =>
  `${localizePrefix}tournaments/${tournamentId}/edit`;

export const urls = {
  tournamentCreate,
  tournaments,
  tournament,
  games,
  tournamentEdit,
};
