'use client'

import { useAppContext } from "@/store/context";
import { type Champion } from "@/store/types";
import Image from "next/image";

interface ChampionListProps {
  onSelectChampion: (param: Champion) => void;
}

export function ChampionList({
  onSelectChampion
}: ChampionListProps){

  const { state } = useAppContext();

  const { search, selected, champions } = state.menu;

  const filteredChampions = [...champions].length
  ? champions.filter((champion) =>
    champion.name.toLowerCase().includes(search.toLowerCase())
  )
  : [];

  return (
    <div
      className="overflow-x-hidden h-[40rem] w-screen max-w-5xl border-4 rounded-md border-gray-400 cursor-pointer 
    scroll scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md">
      <div className="grid grid-cols-10 m-3 p-3 gap-3 items-center">
        {champions.length > 0 ? (
          filteredChampions.map((champion, index) => (
            <div key={index} className={`${champion.name === selected.champion.name ? "border-2 border-white" : ""} cursor-pointer`}>
              {champion.draftable === true && (
                <Image
                  onClick={() => {
                    onSelectChampion(champion)
                  }}
                  width={75}
                  height={75}
                  src={champion.image}
                  alt={champion.name}
                />
              )}{" "}
              {champion.draftable === false && (
                <Image
                  width={75}
                  height={75}
                  src={champion.image}
                  alt={champion.name}
                  className="grayscale"
                />
              )}
            </div>
          ))
        ) : <></>}
      </div>
    </div>
  )
}