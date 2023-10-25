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
    dispatch({ type: 'menu', action: selectPosition(position) })
  };
    
  return (
    <div className="flex gap-3.5 -mt-3">
      {side.bans.map((ban, index) => (
        <div
          className="flex flex-col gap-4 items-center justify-evenly"
          key={index}
        >
          <button
            className="border-4 border-gray-400 w-14 h-14 bg-slate-600 focus:border-gray-300"
            onClick={() => onSelectSlot(ban.position)}
          >
            {ban.champion.image.length >= 1 ? (
              <Image
                src={ban.champion.image}
                width={90}
                height={90}
                alt={ban.champion.name}
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
          <span className="text-sm">{`BAN ${index + 1}`}</span>
        </div>
      ))}
    </div>
  );
}
