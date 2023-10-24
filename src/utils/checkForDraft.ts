import { type Game, type GameSeries } from "@/types/draft";

const isEmptyGame = (game: Game): boolean => {
  const { blueSide, redSide, winner } = game;
  return (
    blueSide.picks.every((pick) => !pick.champion.name) &&
		redSide.picks.every((pick) => !pick.champion.name) &&
		blueSide.bans.every((ban) => !ban.champion.name) &&
		redSide.bans.every((ban) => !ban.champion.name) &&
		winner === null
  );
};

const isIncompleteGame = (game: Game): boolean => {
  const { blueSide, redSide, winner } = game;
  const isBlueIncomplete =
		blueSide.picks.some((pick) => !pick.champion.name) ||
		blueSide.bans.some((ban) => !ban.champion.name);
  const isRedIncomplete =
		redSide.picks.some((pick) => !pick.champion.name) ||
		redSide.bans.some((ban) => !ban.champion.name);
  return (isBlueIncomplete || isRedIncomplete) && winner === null;
};

const isCompleteGame = (game: Game): boolean => {
  const { blueSide, redSide, winner } = game;
  const isBlueComplete =
		blueSide.picks.every((pick) => pick.champion.name) &&
		blueSide.bans.every((ban) => ban.champion.name);
  const isRedComplete =
		redSide.picks.every((pick) => pick.champion.name) &&
		redSide.bans.every((ban) => ban.champion.name);
  return isBlueComplete && isRedComplete && winner !== null;
};

export const validateGameSeries = (series: GameSeries): boolean => {
  return (
    isCompleteGame(series.games[0]!) &&
		series.games.every((game) => isEmptyGame(game) || isCompleteGame(game))
  );
};
