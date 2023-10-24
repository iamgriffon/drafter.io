import { type Draft, type Game, GameSeries, type MatchWinner, type Series } from "../types";
import { type UPDATE_GAME, type UPDATE_GAME_WINNER, type UPDATE_SERIES, type UPDATE_WINNER } from "./actions";

export interface UpdateGameAction {
  type: typeof UPDATE_GAME;
  gameIndex: number,
  payload: Game[];
}

export interface UpdateSeriesAction {
  type: typeof UPDATE_SERIES;
  payload: Series;
};

export interface UpdateGameWinnerAction {
  type: typeof UPDATE_GAME_WINNER;
  gameIndex: number,
  payload: MatchWinner;
}

export interface UpdateSeriesWinnerAction {
  type: typeof UPDATE_WINNER,
  payload: MatchWinner
}

export type DraftActions = UpdateSeriesAction | UpdateGameAction | UpdateGameWinnerAction | UpdateSeriesWinnerAction;
export type DraftPayloadTypes = Partial<Draft> | Series | MatchWinner;