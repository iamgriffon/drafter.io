import {
  type Champion,
  type DraftPosition,
  type Game,
  type GameSeries,
  type MatchWinner,
} from "../types";
import { initialDraftState } from "./reducer";
import { type UpdateGameAction, type UpdateGameWinnerAction } from "./types";

export const UPDATE_SERIES = "UPDATE_SERIES";
export const UPDATE_GAME = "UPDATE_GAME";
export const UPDATE_WINNER = "UPDATE_WINNER";
export const UPDATE_GAME_WINNER = "UPDATE_GAME_WINNER";

export const updateDraft = (
  state: GameSeries,
  gameIndex: number,
  position: DraftPosition,
  championData: Champion,
): UpdateGameAction => {
  const currentGames = [...state.games];
  const gameToUpdate = currentGames[gameIndex]!;
  const sideToUpdate = position.startsWith("R") ? "redSide" : "blueSide";
  const pickOrBan = position.length === 2 ? "picks" : "bans";

  const updatedDraft = gameToUpdate![sideToUpdate][pickOrBan].find(item => item.position === position);
  updatedDraft!.champion = championData;

   // Create the payload by updating the specific game in the games array
  const payload = currentGames!.map((game, index) => {
    if (index === gameIndex) {
      return gameToUpdate;
    } else {
      return game;
    }
  });

  return {
    type: "UPDATE_GAME",
    gameIndex,
    payload: payload,
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
