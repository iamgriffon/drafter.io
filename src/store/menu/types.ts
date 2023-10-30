import { type Draft as PrismaDraft } from "@prisma/client";
import {
  type DraftResponse,
  type Champion,
  type DraftPosition,
  type MatchWinner,
  type Series,
} from "../types";

export const UPDATE_SERIES = "UPDATE_SERIES";
export const SELECT_GAME = "SELECT_GAME";
export const UPDATE_CHAMPIONS = "UPDATE_CHAMPIONS";
export const UPDATE_WINNER = "UPDATE_WINNER";
export const SEARCH_CHAMPION = "SEARCH_CHAMPION";
export const UPDATE_SCRIM = "UPDATE_SCRIM";
export const SELECT_CHAMPION = "SELECT_CHAMPION";
export const SELECT_POSITION = "SELECT_POSITION";
export const STORE_DRAFTS = "STORE_DRAFTS";

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
  drafts: DraftResponse;
}

type x = {
  a: PrismaDraft[];
};

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

export interface StoreDraftsAction {
  type: typeof STORE_DRAFTS;
  payload: PrismaDraft[];
}

export type MenuActions =
  | UpdateSeriesAction
  | SelectGameAction
  | UpdateChampionsAction
  | UpdateScrimAction
  | SearchChampionAction
  | UpdateWinnerAction
  | SelectPositionAction
  | SelectChampionAction
  | StoreDraftsAction;
