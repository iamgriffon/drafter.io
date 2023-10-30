import {
  type GameSeries,
  type Game,
  type MatchWinner,
  type Series,
} from "../types";

export const UPDATE_SERIES = "UPDATE_SERIES";
export const UPDATE_GAME = "UPDATE_GAME";
export const UPDATE_WINNER = "UPDATE_WINNER";
export const UPDATE_GAME_WINNER = "UPDATE_GAME_WINNER";
export const PURGE_WINNERS = "PURGE_WINNERS";
export const UPDATE_ID = "UPDATE_ID";
export const UPDATE_DRAFT = "UPDATE_DRAFT";

export interface UpdateGameAction {
  type: typeof UPDATE_GAME;
  gameIndex: number;
  payload: Game[];
}

export interface UpdateSeriesAction {
  type: typeof UPDATE_SERIES;
  payload: {
    games: Game[];
    series: Series;
  };
}

export interface UpdateGameWinnerAction {
  type: typeof UPDATE_GAME_WINNER;
  gameIndex: number;
  payload: Game[];
}

export interface UpdateSeriesWinnerAction {
  type: typeof UPDATE_WINNER;
  payload: MatchWinner;
}

export interface PurgeGamesWinnersAction {
  type: typeof PURGE_WINNERS;
  payload: Game[];
}

export interface UpdateDraftIDAction {
  type: typeof UPDATE_ID;
  payload: string;
}

export interface UpdateDraftAction {
  type: typeof UPDATE_DRAFT;
  payload: GameSeries;
}

export type DraftActions =
  | UpdateSeriesAction
  | UpdateGameAction
  | UpdateGameWinnerAction
  | UpdateSeriesWinnerAction
  | PurgeGamesWinnersAction
  | UpdateDraftIDAction
  | UpdateDraftAction;
