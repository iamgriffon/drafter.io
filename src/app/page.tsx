'use client'

import { useAppContext } from "@/store/context";
import { searchChampion, selectChampion, selectGame, selectPosition, updateChampions, updateMenuSeries, updateMenuGameWinner } from "@/store/menu/actions";
import { type Champion, type DraftPosition, type MatchWinner, type Series } from "@/store/types";
import { useCallback, useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import { updateDraftPicks, updateDraftSeries, updateDraftGameWinner } from "@/store/draft/actions";
import { DEFAULT_CHAMPION_STATE } from "@/utils/setDefaultValues";
import { ChampionList, GameIndicator, GamePickerButtons, NavBar, SearchBox, SeriesPicker, SideBans, SidePicks, Switch, WinnerPicker } from '@/app/components'

export default function Home() {

  const { state, dispatch } = useAppContext()
  const { draft, menu } = state;
  const { champions, game: currentGame } = menu;
  const { champion, position } = menu.selected;
  const championData = api.champion.fetchChampions.useQuery(undefined, {
    enabled: false
  });

  const onSearch = useCallback((input: string) => {
    dispatch({ type: 'menu', action: searchChampion(input) });
  }, [dispatch]);
  
  const onSelectSlot = useCallback((position: DraftPosition) => {
    dispatch({ type: 'menu', action: selectPosition(position) });
  }, [dispatch]);
  
  const onSelectChampion = useCallback((champion: Champion) => {
    dispatch({ type: 'menu', action: selectChampion(champion) });
  }, [dispatch]);
  
  const onSelectGame = useCallback((game: number) => {
    dispatch({ type: 'menu', action: selectGame(game) });
    dispatch({ type: 'menu', action: selectChampion(DEFAULT_CHAMPION_STATE) });
  }, [dispatch]);
  
  const onSelectSeries = useCallback((param: Series) => {
    dispatch({ type: 'draft', action: updateDraftSeries(state.draft, param) });
    dispatch({ type: 'menu', action: updateMenuSeries(param) });
    dispatch({ type: 'menu', action: selectGame(1) });
  }, [dispatch, state]);
  
  const onSelectWinner = useCallback((param: MatchWinner) => {
    dispatch({ type: 'draft', action: updateDraftGameWinner(state.draft, currentGame, param) });
  }, [dispatch, state, currentGame]);

  const onDraftChampion = useCallback(() => {
    if (champion.id.length > 0 && position != null) {
      dispatch({ type: 'draft', action: updateDraftPicks(state.draft, menu.game, position, champion) });
      dispatch({ type: 'menu', action: selectGame(currentGame) });
      dispatch({ type: 'menu', action: selectChampion(DEFAULT_CHAMPION_STATE) });
      dispatch({ type: 'menu', action: selectPosition(null) });
    }
  }, [dispatch, state, menu.game, position, champion, currentGame]);

  const updatedSide = (game: number) => {
    return draft.games[game - 1]!
  };

  const updatedChampions = () => {
    const currentMatch = draft.games.find(game => game.game === currentGame)!;
    if (currentMatch) {
      const updatedChampions = champions.map(champ => {
        const isDrafted = currentMatch.redSide.picks.some((pick) => pick.champion.id === champ.id) ||
          currentMatch.redSide.bans.some((ban) => ban.champion.id === champ.id) ||
          currentMatch.blueSide.picks.some((pick) => pick.champion.id === champ.id) ||
          currentMatch.blueSide.bans.some((ban) => ban.champion.id === champ.id);
        champ.draftable = !isDrafted;
        return champ;
      });
      return updatedChampions;
    } else {
      return champions
    }
  };

  async function fetchData() {
    try {
      const callback = await championData.refetch();
      if (callback.data) {
        const newData = callback.data.map(champ => {
          return {
            ...champ,
            draftable: true
          }
        });
        dispatch({ type: 'menu', action: updateChampions(newData as Champion[]) })
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    onDraftChampion();
    return () => onDraftChampion();
  }, [onSelectChampion, onSelectSlot, onSelectGame, onDraftChampion]);

  useEffect(() => {
    if (menu.winner !== 'none') {
      dispatch({ type: 'draft', action: updateDraftGameWinner(state.draft, currentGame, menu.winner) });
      dispatch({ type: 'menu', action: updateMenuGameWinner('none') });
    };
  }, [menu.winner, onSelectWinner, currentGame, dispatch, state.draft]);

  const updatedGames = useCallback(() => {
    return draft.games
  }, [fetchData, onSelectChampion, onSelectSlot, onSelectGame, onSelectWinner, draft.games]);


  return (
    <main className="flex flex-col items-center gap-8">
      <NavBar />
      <header className="flex self-center items-center gap-8  max-w-[100vw]">
        <Switch />
        <SearchBox value={menu.search} onChangeValue={onSearch} />
        <SeriesPicker onSelectSeries={onSelectSeries} />
        <GamePickerButtons games={updatedGames()} onSelectMatch={onSelectGame} />
        <WinnerPicker onSelectWinner={onSelectWinner} />
        <GameIndicator />
      </header>
      <section className="flex gap-8">
        <SidePicks side={updatedSide(menu.game).blueSide} title='BLUE SIDE' isWinner={draft.winner} />
        <ChampionList champions={updatedChampions()} onSelectChampion={onSelectChampion} />
        <SidePicks side={updatedSide(menu.game).redSide} title='RED SIDE' isWinner={draft.winner} />
      </section>
      <footer className="flex items-center justify-between mt-2 w-screen max-w-5xl">
        <SideBans side={updatedSide(menu.game).blueSide} />
        <SideBans side={updatedSide(menu.game).redSide} />
      </footer>
    </main>
  );
}