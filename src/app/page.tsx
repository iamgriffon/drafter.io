'use client'

import { useAppContext } from "@/store/context";
import { searchChampion, selectChampion, selectPosition, updateChampions } from "@/store/menu/actions";
import { SidePicks } from "./_components/picks";
import { SearchBox } from "./_components/search";
import { ChampionList } from "./_components/champions";
import { Champion, DraftPosition } from "@/store/types";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { updateDraft } from "@/store/draft/actions";
import { DEFAULT_CHAMPION_STATE } from "@/utils/setDefaultValues";

export default function Home() {

  const { state, dispatch } = useAppContext()
  const { draft, menu } = state;
  const { selected, search, champions } = menu;
  const { champion, position } = menu.selected;
  const championData = api.champion.fetchChampions.useQuery(undefined, {
    enabled: false
  });

  useEffect(() => {
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

  const onDraftChampion = () => {
    const redSide = draft.games[menu.game - 1]!['redSide']!;
    const blueSide = draft.games[menu.game - 1]!['blueSide']!;

    const checkAvailability = champions.map(champ => {
      const isDrafted = redSide.picks.some((pick) => pick.champion.id === champ.id) ||
        redSide.bans.some((ban) => ban.champion.id === champ.id) ||
        blueSide.picks.some((pick) => pick.champion.id === champ.id) ||
        blueSide.bans.some((ban) => ban.champion.id === champ.id);

      champ.draftable = !isDrafted;
      return champ;
    })

    if (champion.id.length > 0 && position != null) {
      dispatch({ type: 'draft', action: updateDraft(state.draft, menu.game - 1, position, champion) });
      dispatch({ type: 'menu', action: selectChampion(DEFAULT_CHAMPION_STATE) });
      dispatch({ type: 'menu', action: selectPosition(null) });
      dispatch({ type: 'menu', action: updateChampions(checkAvailability) });
    }
  }

  useEffect(() => {
    onDraftChampion();
    return () => onDraftChampion();
  }, [onSelectChampion, onSelectSlot]);


  return (
    <main className="flex flex-col gap-8">
      <header className="flex items-center gap-8">
        <SearchBox value={menu.search} onChangeValue={onSearch} />
      </header>
      <section className="flex gap-8">
        <SidePicks side={draft.games[menu.game - 1]!.blueSide} title='BLUE SIDE' isWinner={draft.winner} onSelectSlot={onSelectSlot} />
        <ChampionList onSelectChampion={onSelectChampion} />
        <SidePicks side={draft.games[menu.game - 1]!.redSide} title='RED SIDE' isWinner={draft.winner} onSelectSlot={onSelectSlot} />
      </section>
    </main>
  );
}