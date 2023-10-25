import { DEFAULT_BO3_STATE, DEFAULT_BO5_STATE } from "@/utils/setDefaultValues";
import {
  Series,
  type Champion,
  type DraftPosition,
  type GameSeries,
  type MatchWinner,
} from "../types";
import {
  UpdateSeriesAction,
  UPDATE_GAME_WINNER,
  UPDATE_SERIES,
  type UpdateGameAction,
  type UpdateGameWinnerAction,
} from "./types";

export const updateDraft = (
  state: GameSeries,
  gameIndex: number,
  position: DraftPosition,
  championData: Champion,
): UpdateGameAction => {
  if (gameIndex < 0) {
    throw new Error("gameIndex must be a positive number.");
  }

  const currentGames = [...state.games];
  const gameIndexToUpdate = currentGames.findIndex(
    (game) => game.game === gameIndex,
  )!;

  if (gameIndexToUpdate !== -1) {
    const gameToUpdate = currentGames[gameIndexToUpdate];
    const sideToUpdate = position.startsWith("R") ? "redSide" : "blueSide";
    const pickOrBan = position.length === 3 ? "bans" : "picks";

    if (gameToUpdate) {
      const updatedGame = {
        ...gameToUpdate,
        [sideToUpdate]: {
          ...gameToUpdate![sideToUpdate],
          [pickOrBan]: gameToUpdate![sideToUpdate][pickOrBan].map((draft) => {
            if (draft.position === position) {
              return {
                ...draft,
                champion: championData,
              };
            }
            return draft;
          }),
        },
      };
      currentGames[gameIndexToUpdate] = updatedGame;
    }
  }

  return {
    type: "UPDATE_GAME",
    gameIndex,
    payload: currentGames,
  };
};

export const updateGameWinner = (
  gameIndex: number,
  winner: MatchWinner,
): UpdateGameWinnerAction => {
  return {
    type: UPDATE_GAME_WINNER,
    gameIndex,
    payload: winner,
  };
};

export const updateDraftSeries = (
  state: GameSeries,
  series: Series,
): UpdateSeriesAction => {
  let currentGames = state.games.slice();

 if (currentGames.length > 0){
  if (series === "BO1") {
    return {
      type: "UPDATE_SERIES",
      payload: {
        series,
        games: currentGames.slice(0, 1),
      },
    };
  }

  const enumMap = {
    BO1: 1,
    BO3: 3,
    BO5: 5,
  };

  if (currentGames.length > enumMap[series]) {
    currentGames.length = enumMap[series];
  } else if (series === "BO3" || series === "BO5") {
    const defaultGames =
      series === "BO3" ? DEFAULT_BO3_STATE.games : DEFAULT_BO5_STATE.games;
    const diff = enumMap[series] - currentGames.length;
    currentGames = currentGames.concat(defaultGames.slice(diff * -1));
  }
 }

  return {
    type: UPDATE_SERIES,
    payload: {
      series,
      games: currentGames,
    },
  };
};
