import { get } from './base.api';

export const getPlayers = async (tournamentId: string) => {
  const res = await get(`/players/tournaments/${tournamentId}`);
  return res as {
    count: number;
    items: {
      id?: string;
      name: string;
    }[];
  };
};
