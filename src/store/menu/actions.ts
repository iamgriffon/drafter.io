import { DraftPosition, Series, type Champion } from "../types";
import {
  SelectChampionAction,
  SelectPositionAction,
  type SearchChampionAction,
  type SelectGameAction,
  type UpdateChampionsAction,
  type UpdateScrimAction,
  type UpdateWinnerAction,
  UpdateSeriesAction
} from "./types";

export const UPDATE_SERIES = "UPDATE_SERIES";
export const SELECT_GAME = "SELECT_GAME";
export const UPDATE_CHAMPIONS = "UPDATE_CHAMPIONS";
export const UPDATE_WINNER = "UPDATE_WINNER";
export const SEARCH_CHAMPION = "SEARCH_CHAMPION";
export const UPDATE_SCRIM = "UPDATE_SCRIM";
export const SELECT_CHAMPION = "SELECT_CHAMPION";
export const SELECT_POSITION = "SELECT_POSITION";

export const selectGame = (game: number): SelectGameAction => {
  return {
    type: SELECT_GAME,
    payload: game,
  };
};

export const updateChampions = (
  champions: Champion[],
): UpdateChampionsAction => {
  return {
    type: UPDATE_CHAMPIONS,
    payload: champions,
  };
};

export const updateWinner = (
  winner: "red" | "blue" | "none",
): UpdateWinnerAction => {
  return {
    type: UPDATE_WINNER,
    payload: winner,
  };
};

export const searchChampion = (search: string): SearchChampionAction => {
  return {
    type: SEARCH_CHAMPION,
    payload: search,
  };
};

export const switchScrim = (scrim: boolean): UpdateScrimAction => {
  return {
    type: UPDATE_SCRIM,
    payload: scrim,
  };
};

export const selectChampion = (champion: Champion): SelectChampionAction => {
  return {
    type: SELECT_CHAMPION,
    payload: champion,
  };
};

export const selectPosition = (
  position: DraftPosition | null,
): SelectPositionAction => {
  return {
    type: "SELECT_POSITION",
    payload: position,
  };
};

export const updateSeries = (series: Series): UpdateSeriesAction => {
  return {
    type: 'UPDATE_SERIES',
    payload: series
  }
}
