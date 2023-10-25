import { useAppContext } from "@/store/context";
import { purgeDraftWinner } from "@/store/draft/actions";
import { switchScrim } from "@/store/menu/actions";

export function Switch() {

  const { state, dispatch } = useAppContext();
  const { scrim } = state.menu;

  function handleToggle() {
    dispatch({ type: 'menu', action: switchScrim(!scrim) });
    dispatch({ type: 'draft', action: purgeDraftWinner(state.draft) })
  }

  const toggleClass = " transform translate-x-5";

  return (
    <div className="flex flex-row gap-3">
      <div className="flex flex-col justify-center items-center">
        <div
          className={`md:w-13 md:h-7 w-[3.4rem] h-4 flex items-center rounded-full p-1 cursor-pointer ${scrim ? "bg-cyan-400" : "bg-green-400"
            }`}
          onClick={() => handleToggle()}
        >
          <div
            className={
              "bg-gray-100 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (scrim ? toggleClass : "")
            }
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">
          {scrim ? "Scrim Mode" : "Stage Mode"}
        </p>
        <span className="text-sm w-36 flex-nowrap">{scrim ? "Pick games freely" : "One game at a time"}</span>
      </div>
    </div>
  );
}