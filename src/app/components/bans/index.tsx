import { useAppContext } from "@/store/context";
import { selectPosition } from "@/store/menu/actions";
import { type BlueSide, type DraftPosition, type RedSide } from "@/store/types";
import Image from "next/image";

interface RedSideBansProps {
  side: BlueSide | RedSide;
}

export function SideBans({ side }: RedSideBansProps) {
  const { dispatch } = useAppContext();

  function onSelectSlot(position: DraftPosition) {
    dispatch({ type: "menu", action: selectPosition(position) });
  }

  return (
    <div className="-mt-3 flex gap-3.5">
      {side.bans.map((ban, index) => (
        <div
          className="flex flex-col items-center justify-evenly gap-4"
          key={index}
        >
          <button
            className="h-14 w-14 border-4 border-gray-400 bg-slate-600 focus:border-gray-300"
            onClick={() => onSelectSlot(ban.position)}
          >
            {ban.champion.image.length >= 1 ? (
              <Image
                src={ban.champion.image}
                width={90}
                height={90}
                alt={ban.champion.name}
                priority
                id={`ban-position-${ban.position}`}
              />
            ) : (
              <Image
                src="/champion_placeholder.webp"
                width={90}
                height={90}
                alt="placeholder"
                id={`ban-placeholder-${ban.position}`}
              />
            )}
          </button>
          <span className="text-sm">{`BAN ${index + 1}`}</span>
        </div>
      ))}
    </div>
  );
}
