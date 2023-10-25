import { useAppContext } from "@/store/context";

export function GameIndicator() {
  const { state } = useAppContext();
  const { draft, menu } = state

  return (
    <div className="flex items-center">
      {draft.games.length && menu.game ? (
        <>
          <p className="font-bold text-sm"> Drafting in:</p>
          <span className="text-sm px-2">Game {menu.game}</span>
        </>
      ) : (
        <>
          <p className="font-bold text-sm"> Please select a series</p>
        </>
      )}
    </div>
  );
}
