import { useAppContext } from "@/store/context";
import { type MatchWinner } from "@/store/types";

interface WinnerPickerProps {
  onSelectWinner: (param: MatchWinner) => void;
}

export function WinnerPicker({ onSelectWinner }: WinnerPickerProps) {
  const { state } = useAppContext();

  return (
    <div className="flex pl-3 left-[76%] mt-5 justify-start flex-col items-center">
      <span className="text-xs px-[1/2] -mt-5 font-bold mb-2">Pick Winner</span>
      <div className="flex gap-3">
        <button
          className="bg-blue-600 h-10 w-10 rounded-full focus:border-2 focus:border-gray-200"
          onClick={() => onSelectWinner("blue")}
        ></button>
        <p className="text-xl place-self-center">|</p>
        <button
          className="bg-red-600 h-10 w-10 rounded-full focus:border-2 focus:border-gray-200"
          onClick={() => onSelectWinner("red")}
        ></button>
        {state.menu.scrim && (
          <>
            <p className="text-xl place-self-center">|</p>
            <button
              className="bg-white h-10 w-10 rounded-full focus:border-2 focus:border-gray-200"
              onClick={() => onSelectWinner("none")}
            ></button>
          </>
        )}
      </div>
    </div>
  );
}
