export type MatchWinner = "red" | "blue" | "none";

export type Draft = {
	blueSide: BlueSide;
	redSide: RedSide;
};

export type Champion = {
	id: string;
	name: string;
	image: string;
	draftable: boolean | null;
};

export type GameSeries = {
	series: Series;
	winner: MatchWinner;
	games: Game[];
	id?: string;
};

export type Game = {
	game: number;
	winner: MatchWinner;
	blueSide: BlueSide;
	redSide: RedSide;
};

export type Series = "BO1" | "BO3" | "BO5";

export type DraftPosition =
  | "R1"
  | "R2"
  | "R3"
  | "R4"
  | "R5"
  | "B1"
  | "B2"
  | "B3"
  | "B4"
  | "B5"
  | "RB1"
  | "RB2"
  | "RB3"
  | "RB4"
  | "RB5"
  | "BB1"
  | "BB2"
  | "BB3"
  | "BB4"
  | "BB5";

// Define an indexed type for DraftPosition
type PositionData = Array<{ position: DraftPosition, champion: Champion }>

export interface BlueSide {
  picks: PositionData;
  bans: PositionData;
}

export interface RedSide {
  picks: PositionData;
  bans: PositionData;
}
