import { type Draft } from "@prisma/client";
import { type DraftPosition, type Series, type Champion } from "../types";
import {
  type SelectChampionAction,
  type SelectPositionAction,
  type SearchChampionAction,
  type SelectGameAction,
  type UpdateChampionsAction,
  type UpdateScrimAction,
  type UpdateWinnerAction,
  type UpdateSeriesAction,
  type StoreDraftsAction,
  SEARCH_CHAMPION,
  SELECT_CHAMPION,
  SELECT_GAME,
  UPDATE_CHAMPIONS,
  UPDATE_SCRIM,
  UPDATE_WINNER,
  SELECT_POSITION,
  UPDATE_SERIES,
  STORE_DRAFTS
} from "./types";

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

export const updateMenuGameWinner = (
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
    type: SELECT_POSITION,
    payload: position,
  };
};

export const updateMenuSeries = (series: Series): UpdateSeriesAction => {
  return {
    type: UPDATE_SERIES,
    payload: series
  }
}

export const storeDrafts = (drafts: Draft[]): StoreDraftsAction => {
  return {
    type: STORE_DRAFTS,
    payload: drafts
  }
}
