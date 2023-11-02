import {
  type BlueSide,
  type Champion,
  type Game,
  type GameSeries,
  type RedSide,
} from "@/store/types";

export const PLACEHOLDER_CHAMPION: Champion = {
  id: "0001",
  draftable: true,
  image: "/champion_placeholder.webp",
  name: "PLACEHOLDER",
};

export const DEFAULT_BLUE_SIDE_DRAFT_STATE: BlueSide = {
  picks: [
    {
      position: "B1",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "B2",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "B3",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "B4",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "B5",
      champion: PLACEHOLDER_CHAMPION,
    },
  ],
  bans: [
    {
      position: "BB1",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "BB2",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "BB3",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "BB4",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "BB5",
      champion: PLACEHOLDER_CHAMPION,
    },
  ],
};

export const DEFAULT_RED_SIDE_DRAFT_STATE: RedSide = {
  picks: [
    {
      position: "R1",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "R2",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "R3",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "R4",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "R5",
      champion: PLACEHOLDER_CHAMPION,
    },
  ],
  bans: [
    {
      position: "RB1",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "RB2",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "RB3",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "RB4",
      champion: PLACEHOLDER_CHAMPION,
    },
    {
      position: "RB5",
      champion: PLACEHOLDER_CHAMPION,
    },
  ],
};

export const DEFAULT_CHAMPION_STATE: Champion = {
  id: "",
  draftable: null,
  image: "",
  name: "",
};

export const DEFAULT_GAME_STATE: Game = {
  game: 1,
  blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
  redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
  winner: "none",
};

export const DEFAULT_BO1_STATE: GameSeries = {
  series: "BO1",
  winner: "none",
  id: "",
  games: [
    {
      game: 1,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
  ],
};

export const DEFAULT_BO3_STATE: GameSeries = {
  series: "BO3",
  winner: "none",
  games: [
    {
      game: 1,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
    {
      game: 2,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
    {
      game: 3,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
  ],
};

export const DEFAULT_BO5_STATE: GameSeries = {
  series: "BO5",
  winner: "none",
  games: [
    {
      game: 1,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
    {
      game: 2,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
    {
      game: 3,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
    {
      game: 4,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
    {
      game: 5,
      winner: "none",
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
    },
  ],
};
