'use client'

import { useAppContext } from "@/store/context";
import { searchChampion, selectChampion, selectGame, selectPosition, updateChampions, updateSeries } from "@/store/menu/actions";
import { SidePicks } from "./_components/picks";
import { SearchBox } from "./_components/search";
import { ChampionList } from "./_components/champions";
import { Champion, DraftPosition, Series } from "@/store/types";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { updateDraft, updateDraftSeries } from "@/store/draft/actions";
import { DEFAULT_CHAMPION_STATE } from "@/utils/setDefaultValues";
import { SideBans } from "./_components/bans";
import { Switch } from "./_components/switch";
import { SeriesPicker } from "./_components/gameoption";
import { GamePickerButtons } from "./_components/gameselector";

export default function Home() {

  const { state, dispatch } = useAppContext()
  const { draft, menu } = state;
  const { champions, game: currentGame } = menu;
  const { champion, position } = menu.selected;
  const championData = api.champion.fetchChampions.useQuery(undefined, {
    enabled: false
  });

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  function onSearch(input: string) {
    dispatch({ type: 'menu', action: searchChampion(input) })
  };

  function onSelectSlot(position: DraftPosition) {
    dispatch({ type: 'menu', action: selectPosition(position) })
  };

  function onSelectChampion(champion: Champion) {
    dispatch({ type: 'menu', action: selectChampion(champion) })
  };

  function onSelectGame(game: number) {
    dispatch({ type: 'menu', action: selectGame(game) });
  }

  function onSelectSeries(param: Series) {
    dispatch({ type: 'draft', action: updateDraftSeries(state.draft, param) });
    dispatch({ type: 'menu', action: updateSeries(param) });
    dispatch({type: 'menu', action: selectGame(1)})
  };

  function onDraftChampion() {
    if (champion.id.length > 0 && position != null) {
      dispatch({ type: 'draft', action: updateDraft(state.draft, menu.game, position, champion) });
      dispatch({ type: 'menu', action: selectGame(currentGame) });
      dispatch({ type: 'menu', action: selectChampion(DEFAULT_CHAMPION_STATE) });
      dispatch({ type: 'menu', action: selectPosition(null) });
    }
  };

  useEffect(() => {
    onDraftChampion();
    return () => onDraftChampion();
  }, [onSelectChampion, onSelectSlot, onSelectGame]);

  const updatedSide = (game: number) => {
    return draft.games[game - 1]!
  }

  const updatedChampions = () => {
    const currentMatch = draft.games.find(game => game.game === currentGame)!;
    if (currentMatch){
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
  }

  return (
    <main className="flex flex-col items-center gap-8">
      <header className="flex self-center items-center w-full gap-8 max-w-5xl">
        <Switch />
        <SearchBox value={menu.search} onChangeValue={onSearch} />
        <SeriesPicker onSelectSeries={onSelectSeries} />
        <GamePickerButtons onSelectGame={onSelectGame} />
      </header>
      <section className="flex gap-8">
        <SidePicks side={updatedSide(menu.game).blueSide} title='BLUE SIDE' isWinner={draft.winner} />
        <ChampionList champions={updatedChampions()} onSelectChampion={onSelectChampion} />
        <SidePicks side={updatedSide(menu.game).redSide} title='RED SIDE' isWinner={draft.winner} />
      </section>
      <footer className="flex items-center justify-between mt-4 w-screen max-w-5xl">
        <SideBans side={updatedSide(menu.game).blueSide} />
        <SideBans side={updatedSide(menu.game).redSide} />
      </footer>
    </main>
  );
}