import { DEFAULT_BO3_STATE, DEFAULT_BO5_STATE } from "@/utils/setDefaultValues";
import {
  type Series,
  type Champion,
  type DraftPosition,
  type GameSeries,
  type MatchWinner,
} from "../types";
import {
  PURGE_WINNERS,
  UPDATE_GAME_WINNER,
  UPDATE_SERIES,
  UPDATE_ID,
  UPDATE_DRAFT,
  type PurgeGamesWinnersAction,
  type UpdateSeriesAction,
  type UpdateGameAction,
  type UpdateGameWinnerAction,
  type UpdateDraftIDAction,
  type UpdateDraftAction,
} from "./types";

export const updateDraftPicks = (
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
          ...gameToUpdate[sideToUpdate],
          [pickOrBan]: gameToUpdate[sideToUpdate][pickOrBan].map((draft) => {
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

export const updateDraftGameWinner = (
  state: GameSeries,
  gameIndex: number,
  winner: MatchWinner,
): UpdateGameWinnerAction => {
  const updatedGames = [...state.games];
  const gameIndexToUpdate = updatedGames.findIndex(
    (game) => game.game === gameIndex,
  );

  if (gameIndexToUpdate !== -1) {
    const gameToUpdate = { ...updatedGames[gameIndexToUpdate]! };
    gameToUpdate.winner = winner;
    updatedGames[gameIndexToUpdate] = gameToUpdate;

    return {
      type: UPDATE_GAME_WINNER,
      gameIndex,
      payload: updatedGames,
    };
  }
  
  return {
    type: UPDATE_GAME_WINNER,
    gameIndex,
    payload: state.games,
  };
};

export const updateDraftSeries = (
  state: GameSeries,
  series: Series,
): UpdateSeriesAction => {
  let currentGames = state.games.slice();

  if (currentGames.length > 0) {
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

export const purgeDraftWinner = (state: GameSeries): PurgeGamesWinnersAction => {
  const winner: MatchWinner = "none"
  const currentGames = [...state.games].map(game => {
    return {
      ...game,
      winner
    }
  })
  
  return {
    type: PURGE_WINNERS,
    payload: currentGames
  }
}

export const updateDraftID = (id: string): UpdateDraftIDAction => {
  return {
    type: UPDATE_ID,
    payload: id
  }
}

export const updateFullDraft = (Draft: GameSeries): UpdateDraftAction => {
  return {
    type: UPDATE_DRAFT,
    payload: Draft
  }
}