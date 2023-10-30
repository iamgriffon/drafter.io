import { useAppContext } from "@/store/context";
import { purgeDraftWinner } from "@/store/draft/actions";
import { switchScrim } from "@/store/menu/actions";

export function Switch() {
  const { state, dispatch } = useAppContext();
  const { scrim } = state.menu;

  function handleToggle() {
    dispatch({ type: "menu", action: switchScrim(!scrim) });
    dispatch({ type: "draft", action: purgeDraftWinner(state.draft) });
  }

  const toggleClass = " transform translate-x-5";

  return (
    <div className="flex flex-row gap-3">
      <div className="flex flex-col items-center justify-center">
        <div
          className={`md:w-13 flex h-4 w-[3.4rem] cursor-pointer items-center rounded-full p-1 md:h-7 ${
            scrim ? "bg-cyan-400" : "bg-green-400"
          }`}
          id="scrim-stage-switch"
          onClick={() => handleToggle()}
        >
          <div
            className={
              "h-5 w-5 transform rounded-full bg-gray-100 shadow-md duration-300 ease-in-out md:h-6 md:w-6" +
              (scrim ? toggleClass : "")
            }
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">{scrim ? "Scrim Mode" : "Stage Mode"}</p>
        <span className="w-36 flex-nowrap text-sm">
          {scrim ? "Pick games freely" : "One game at a time"}
        </span>
      </div>
    </div>
  );
}
