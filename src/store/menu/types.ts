import {
  type Champion,
  type DraftPosition,
  type MatchWinner,
  type Series,
} from "../types";
import {
  type SELECT_CHAMPION,
  type SELECT_POSITION,
  type SEARCH_CHAMPION,
  type SELECT_GAME,
  type UPDATE_CHAMPIONS,
  type UPDATE_SCRIM,
  type UPDATE_SERIES,
  type UPDATE_WINNER,
} from "./actions";

export interface MenuProps {
  champions: Champion[];
  game: number;
  search: string;
  winner: MatchWinner;
  series: Series;
  scrim: boolean;
  selected: {
    champion: Champion;
    position: DraftPosition | null;
  };
}

export interface UpdateSeriesAction {
  type: typeof UPDATE_SERIES;
  payload: Series;
}

export interface SelectGameAction {
  type: typeof SELECT_GAME;
  payload: number;
}

export interface UpdateChampionsAction {
  type: typeof UPDATE_CHAMPIONS;
  payload: Champion[];
}

export interface UpdateWinnerAction {
  type: typeof UPDATE_WINNER;
  payload: MatchWinner;
}

export interface SearchChampionAction {
  type: typeof SEARCH_CHAMPION;
  payload: string;
}

export interface UpdateScrimAction {
  type: typeof UPDATE_SCRIM;
  payload: boolean;
}

export interface SelectChampionAction {
  type: typeof SELECT_CHAMPION;
  payload: Champion;
}

export interface SelectPositionAction {
  type: typeof SELECT_POSITION;
  payload: DraftPosition | null;
}

export type MenuActions =
  | UpdateSeriesAction
  | SelectGameAction
  | UpdateChampionsAction
  | UpdateScrimAction
  | SearchChampionAction
  | UpdateWinnerAction
  | SelectPositionAction
  | SelectChampionAction;

/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export type MenuPayloadTypes =
  | Series
  | number
  | string
  | boolean
  | MatchWinner
  | Champion[];
