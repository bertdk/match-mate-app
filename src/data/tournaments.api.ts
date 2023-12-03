import { get, patch, post } from './base.api';

export const createTournament = async (body: {
  name: string;
  pointsOnWin: number;
  pointsOnTie: number;
  pointsOnLoss: number;
  players: { name: string }[];
}) => {
  const res = await post('/tournaments', body);
  return res as { name: string; id: string };
};

export const getTournament = async (id: string) => {
  const res = await get(`/tournaments/${id}`);

  return res as {
    id: string;
    name: string;
    pointsOnWin: number;
    pointsOnTie: number;
    pointsOnLoss: number;
  };
};

export const getTournaments = async () => {
  const res = await get(`/tournaments`);
  return res as {
    count: number;
    items: {
      id: string;
      name: string;
      pointsOnWin: number;
      pointsOnTie: number;
      pointsOnLoss: number;
    }[];
  };
};

export const getRanking = async (tournamentId: string) => {
  const res = await get(`/tournaments/${tournamentId}/ranking`);
  return res as {
    items: { name: string; points: number; id: string }[];
    count: number;
  };
};

export const updateTournament = async (
  id: string,
  body: {
    name: string;
    players: {
      name: string;
      id?: string | undefined;
    }[];
  },
) => {
  const res = await patch(`/tournaments/${id}`, {
    name: body.name,
    players: body.players
      .filter((x) => x.name)
      .map((player) => ({
        id: player.id,
        name: player.name,
      })),
  });
  return res as { id: string };
};
