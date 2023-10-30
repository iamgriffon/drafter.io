import { useAppContext } from "@/store/context";
import { selectPosition } from "@/store/menu/actions";
import {
  type MatchWinner,
  type BlueSide,
  type RedSide,
  type DraftPosition,
} from "@/store/types";
import Image from "next/image";

interface SidePicksProps {
  side: BlueSide | RedSide;
  isWinner: MatchWinner;
  title: "RED SIDE" | "BLUE SIDE";
}

export function SidePicks({ side, isWinner, title }: SidePicksProps) {
  const { dispatch } = useAppContext();

  function onSelectSlot(position: DraftPosition) {
    dispatch({ type: "menu", action: selectPosition(position) });
  }

  const styles = {
    red: {
      main: "flex items-center justify-start",
      picks: "flex gap-5 items-center justify-start",
    },
    blue: {
      main: "flex items-center justify-end",
      picks: "flex gap-5 items-center justify-end",
    },
  };

  return (
    <div className="flex flex-col justify-center gap-8 text-2xl">
      <div
        className={title === "BLUE SIDE" ? styles.blue.main : styles.red.main}
      >
        <h1 className="font-bold">{title}</h1>
      </div>

      {side.picks.map((pick, index) => (
        <div
          className={
            title === "BLUE SIDE" ? styles.blue.picks : styles.red.picks
          }
          key={index}
        >
          {title === "BLUE SIDE" ? (
            <span className="text-right text-xl">{pick.position}</span>
          ) : null}
          <button
            className="w-18 h-18 rounded-full border-4 border-gray-400 bg-slate-600 focus:border-gray-300"
            onClick={() => onSelectSlot(pick.position)}
            id={`${pick.position}-frame-button`}
          >
            {pick.champion.image.length >= 1 ? (
              <Image
                src={pick.champion.image}
                className="rounded-full"
                width={70}
                height={70}
                alt={pick.champion.name}
                priority
              />
            ) : (
              <Image
                src="/champion_placeholder.webp"
                width={70}
                height={70}
                alt="placeholder"
                className="rounded-full"
              />
            )}
          </button>
          {title === "RED SIDE" ? (
            <span id="position-label" className="text-left text-xl">
              {pick.position}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
