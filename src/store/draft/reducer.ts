import { DEFAULT_BO1_STATE } from "@/utils/setDefaultValues";
import { UPDATE_GAME, UPDATE_GAME_WINNER, UPDATE_SERIES, UPDATE_WINNER } from "./actions";
import { type DraftActions } from "./types";
import { type GameSeries } from "../types";

export const initialDraftState: GameSeries = DEFAULT_BO1_STATE;

export const draftReducer = (state: GameSeries = initialDraftState, action: DraftActions) => {
  switch (action.type) {
    case UPDATE_GAME:
      return {
        ...state,
        games: action.payload
      };
    case UPDATE_SERIES:
      return {
        ...state,
        series: action.payload
      };
      case UPDATE_WINNER: 
        return {
          ...state,
          winner: action.payload
        }
      case UPDATE_GAME_WINNER: 
      const currentGames = [...state.games];
      let gameToUpdate = currentGames[action.gameIndex]!
      gameToUpdate = {
        ...gameToUpdate,
        winner: action.payload,
      };
      return {
        ...state,
        games: currentGames,
      };

    default:
      return state;
  }
};