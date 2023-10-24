import { type BlueSide, Draft, type DraftPosition, type RedSide } from "@/store/types";
import Image from "next/image";
import { type Dispatch, type SetStateAction } from "react";

interface RedSideBansProps {
	side: BlueSide | RedSide;
	selectSlot: Dispatch<SetStateAction<DraftPosition>>;
}

export function SideBans({ side, selectSlot }: RedSideBansProps) {
  return (
    <div className="flex gap-3.5 -mt-3">
      {side.bans.map((ban, index) => (
        <div
          className="flex flex-col gap-4 items-center justify-evenly"
          key={index}
        >
          <button
            className="border-4 border-gray-400 w-14 h-14 bg-slate-600 focus:border-gray-300"
            onClick={() => selectSlot(ban!.position)}
          >
            {ban!.champion.image.length >= 1 ? (
              <Image
                src={ban!.champion.image}
                width={90}
                height={90}
                alt={ban!.champion.name}
              />
            ) : (
              <Image
                src="/champion_placeholder.webp"
                width={90}
                height={90}
                alt="placeholder"
              />
            )}
          </button>
          <span className="text-sm">{ban!.position}</span>
        </div>
      ))}
    </div>
  );
}
