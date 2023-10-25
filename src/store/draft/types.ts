import { type Draft, type Game, type MatchWinner, type Series } from "../types";

export const UPDATE_SERIES = "UPDATE_SERIES";
export const UPDATE_GAME = "UPDATE_GAME";
export const UPDATE_WINNER = "UPDATE_WINNER";
export const UPDATE_GAME_WINNER = "UPDATE_GAME_WINNER";

export interface UpdateGameAction {
  type: typeof UPDATE_GAME;
  gameIndex: number,
  payload: Game[];
}

export interface UpdateSeriesAction {
  type: typeof UPDATE_SERIES;
  payload: {
    games: Game[],
    series: Series,
  }
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