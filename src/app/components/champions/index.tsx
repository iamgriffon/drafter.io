"use client";

import { useAppContext } from "@/store/context";
import { type Champion } from "@/store/types";
import { PLACEHOLDER_CHAMPION } from "@/utils/setDefaultValues";
import Image from "next/image";

interface ChampionListProps {
  champions: Champion[];
  onSelectChampion: (param: Champion) => void;
}

export function ChampionList({
  champions,
  onSelectChampion,
}: ChampionListProps) {
  const { state } = useAppContext();

  const { search, selected } = state.menu;

  const filteredChampions = [...champions].length
    ? [PLACEHOLDER_CHAMPION].concat(
      champions.filter((champion) =>
        champion.name.toLowerCase().includes(search.toLowerCase()),
      ),
    )
    : [];

    function truncateString(str: String, maxLength: number) {
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
      } else {
        return str;
      }
    }

  return (
    <div
      className="scroll h-[38rem] w-screen max-w-5xl cursor-pointer overflow-x-hidden rounded-md border-4 
    border-gray-400 scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md"
      id="champion-list"
    >
      <div className="m-3 grid grid-cols-10 items-center gap-3 p-3">
        {champions.length > 0 ? (
          filteredChampions.map((champion, index) => (
            <div
              key={index}
              className={`${champion.name === selected.champion.name
                  ? "border-2 border-white"
                  : ""
                } cursor-pointer`}
            >
              {champion.draftable === true && (
                <Image
                  onClick={() => {
                    onSelectChampion(champion);
                  }}
                  width={75}
                  height={75}
                  src={champion.image}
                  alt={champion.name}
                  priority
                  id={`${champion.name.toLowerCase()}-list`}
                />
              )}{" "}
              {champion.draftable === false && (
                <Image
                  width={75}
                  height={75}
                  src={champion.image}
                  alt={champion.name}
                  className="grayscale"
                  priority
                  id="champion-placeholder-img"
                />
              )}
              <p className="text-sm mt-1">
                {champion.name !== 'PLACEHOLDER' ? truncateString(champion.name, 10) : '\u00A0'}
              </p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
