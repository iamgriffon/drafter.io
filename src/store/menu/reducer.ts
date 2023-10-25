import {
  UPDATE_SERIES,
  SELECT_GAME,
  UPDATE_CHAMPIONS,
  UPDATE_WINNER,
  SEARCH_CHAMPION,
  UPDATE_SCRIM,
  SELECT_CHAMPION,
  SELECT_POSITION,
} from "./actions";
import { type MenuActions, type MenuProps } from "./types";

export const initialMenuState: MenuProps = {
  champions: [],
  game: 1,
  search: "",
  winner: "none",
  series: "BO1",
  scrim: true,
  selected: {
    champion: { id: "", draftable: null, image: "", name: "" },
    position: null,
  },
};

export const menuReducer = (
  state: MenuProps = initialMenuState,
  action: MenuActions,
) => {
  switch (action.type) {
    case UPDATE_SERIES:
      return {
        ...state,
        game: 1,
        series: action.payload,
      };
    case SELECT_GAME:
      return {
        ...state,
        game: action.payload,
      };
    case UPDATE_CHAMPIONS:
      return {
        ...state,
        champions: action.payload,
      };
    case UPDATE_WINNER:
      return {
        ...state,
        winner: action.payload,
      };
    case SEARCH_CHAMPION:
      return {
        ...state,
        search: action.payload,
      };
    case UPDATE_SCRIM:
      return {
        ...state,
        scrim: action.payload,
      };
    case SELECT_CHAMPION: {
      return {
        ...state,
        selected: {
          ...state.selected,
          champion: action.payload,
        },
      };
    }
    case SELECT_POSITION: {
      return {
        ...state,
        selected: {
          ...state.selected,
          position: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
