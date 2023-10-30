import {
  type BlueSide,
  type Champion,
  type Game,
  type GameSeries,
  type RedSide,
} from "@/store/types";

export const DEFAULT_BLUE_SIDE_DRAFT_STATE: BlueSide = {
  picks: [
    {
      position: "B1",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "B2",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "B3",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "B4",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "B5",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
  ],
  bans: [
    {
      position: "BB1",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "BB2",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "BB3",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "BB4",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "BB5",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
  ],
};

export const DEFAULT_RED_SIDE_DRAFT_STATE: RedSide = {
  picks: [
    {
      position: "R1",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "R2",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "R3",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "R4",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "R5",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
  ],
  bans: [
    {
      position: "RB1",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "RB2",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "RB3",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "RB4",
      champion: { id: "", draftable: true, name: "", image: "" },
    },
    {
      position: "RB5",
      champion: { id: "", draftable: true, name: "", image: "" },
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
