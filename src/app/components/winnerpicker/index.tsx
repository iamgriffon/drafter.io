import { useAppContext } from "@/store/context";
import { type MatchWinner } from "@/store/types";

interface WinnerPickerProps {
  onSelectWinner: (param: MatchWinner) => void;
}

export function WinnerPicker({ onSelectWinner }: WinnerPickerProps) {
  const { state } = useAppContext();

  return (
    <div className="left-[76%] mt-5 flex flex-col items-center justify-start pl-3">
      <span className="-mt-5 mb-2 px-[1/2] text-xs font-bold">Pick Winner</span>
      <div className="flex gap-3">
        <button
          className="h-10 w-10 rounded-full bg-blue-600 focus:border-2 focus:border-gray-200"
          onClick={() => onSelectWinner("blue")}
          id="blue-winner-button"
        ></button>
        <p className="place-self-center text-xl">|</p>
        <button
          className="h-10 w-10 rounded-full bg-red-600 focus:border-2 focus:border-gray-200"
          onClick={() => onSelectWinner("red")}
          id="red-winner-button"
        ></button>
        {state.menu.scrim && (
          <>
            <p className="place-self-center text-xl">|</p>
            <button
              className="h-10 w-10 rounded-full bg-white focus:border-2 focus:border-gray-200"
              onClick={() => onSelectWinner("none")}
              id="none-winner-button"
            ></button>
          </>
        )}
      </div>
    </div>
  );
}
