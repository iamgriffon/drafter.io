import { DEFAULT_BO1_STATE } from "@/utils/setDefaultValues";
import {
  PURGE_WINNERS,
  UPDATE_DRAFT,
  UPDATE_GAME,
  UPDATE_GAME_WINNER,
  UPDATE_ID,
  UPDATE_SERIES,
  UPDATE_WINNER,
  type DraftActions,
} from "./types";
import { type GameSeries } from "../types";

export const initialDraftState: GameSeries = DEFAULT_BO1_STATE;

export const draftReducer = (
  state: GameSeries = initialDraftState,
  action: DraftActions,
) => {
  switch (action.type) {
    case UPDATE_GAME:
    case UPDATE_GAME_WINNER:
    case PURGE_WINNERS:
      return {
        ...state,
        games: action.payload,
      };
    case UPDATE_SERIES:
      return {
        ...state,
        series: action.payload.series,
        games: action.payload.games,
      };
    case UPDATE_WINNER:
      return {
        ...state,
        winner: action.payload,
      };
    case UPDATE_ID:
      return {
        ...state,
        id: action.payload,
      };
    case UPDATE_DRAFT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
