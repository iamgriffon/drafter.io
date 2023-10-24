'use client'

import { type MatchWinner, type BlueSide, type RedSide, type DraftPosition } from "@/store/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";

interface SidePicksProps {
	side: BlueSide | RedSide;
	isWinner: MatchWinner;
	title: "RED SIDE" | "BLUE SIDE";
  onSelectSlot: (param: DraftPosition) => void;
}

export function SidePicks({
  side,
  isWinner,
  title,
  onSelectSlot
}: SidePicksProps) {

  const [selectSlot, setSeletedSlot] = useState<DraftPosition>()
    
  const styles = {
    red: {
      main: "flex items-center justify-start",
      picks: "flex gap-5 items-center justify-start"
    },
    blue: {
      main: "flex items-center justify-end",
      picks: "flex gap-5 items-center justify-end"
    }
  };

  return (
    <div className="flex flex-col justify-center text-2xl mt-4 gap-10">
      <div className={title === "BLUE SIDE" ? styles.blue.main: styles.red.main}>
        <h1 className="font-bold">{title}</h1>
      </div>

      {side.picks.map((pick, index) => (
        <div
          className={title === "BLUE SIDE" ? styles.blue.picks : styles.red.picks}
          key={index}
        >
          {title === "BLUE SIDE" ? <span>{pick!.position}</span> : null}
          <button
            className="border-4 rounded-full border-gray-400 w-20 h-20 bg-slate-600 focus:border-gray-300"
            onClick={() => onSelectSlot(pick!.position)}
          >
            {pick!.champion.image.length >= 1 ? (
              <Image
                src={pick!.champion.image}
                className="rounded-full"
                width={90}
                height={90}
                alt={pick!.champion.name}
              />
            ) : (
              <Image
                src="/champion_placeholder.webp"
                width={90}
                height={90}
                alt="placeholder"
                className="rounded-full"
              />
            )}
          </button>
          {title === "RED SIDE" ? <span>{pick!.position}</span> : null}
        </div>
      ))}
    </div>
  );
}
