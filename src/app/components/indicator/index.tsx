import { useAppContext } from "@/store/context";

export function GameIndicator() {
  const { state } = useAppContext();
  const { draft, menu } = state;

  return (
    <div className="flex items-center">
      {draft.games.length && menu.game ? (
        <>
          <p id="game-indicator" className="text-sm font-bold">
            {" "}
            Drafting in:
          </p>
          <span id="game-indicator-span" className="px-2 text-sm">
            Game {menu.game}
          </span>
        </>
      ) : (
        <>
          <p id="game-indicator" className="text-sm font-bold">
            {" "}
            Please select a series
          </p>
        </>
      )}
    </div>
  );
}
