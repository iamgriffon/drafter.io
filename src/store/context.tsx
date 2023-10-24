'use client'

import React, { createContext, useReducer, type ReactNode, type Dispatch, useContext, type Reducer } from 'react';
import { draftReducer, initialDraftState } from './draft/reducer';
import { type DraftActions } from './draft/types';
import { initialMenuState, menuReducer } from './menu/reducer';
import { type MenuActions } from './menu/types';

type CombinedState = {
  draft: typeof initialDraftState;
  menu: typeof initialMenuState;
};

type CombinedAction =
  | { type: 'draft'; action: DraftActions }
  | { type: 'menu'; action: MenuActions };

const AppContext = createContext<{
  state: CombinedState;
  dispatch: Dispatch<CombinedAction>;
} | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer<Reducer<CombinedState, CombinedAction>>(
    (state, action) => {
      switch (action.type) {
        case 'draft':
          return { ...state, draft: draftReducer(state.draft, action.action) };
        case 'menu':
          return { ...state, menu: menuReducer(state.menu, action.action) };
        default:
          return state;
      }
    },
    {
      draft: initialDraftState,
      menu: initialMenuState,
    }
  );

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}