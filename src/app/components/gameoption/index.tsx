import { useAppContext } from "@/store/context";
import { type Series } from "@/store/types";

interface SeriesPickerProps {
  onSelectSeries: (param: Series) => void;
}
export function SeriesPicker({ onSelectSeries }: SeriesPickerProps) {
  const { state } = useAppContext();

  return (
    <div className="flex items-center justify-center">
      <select
        value={state.menu.series}
        onChange={(e) => {
          e.stopPropagation();
          const value = e.target.value;
          onSelectSeries(value as Series);
        }}
        className="h-10 cursor-pointer appearance-none justify-center rounded-md bg-gray-700 px-3 text-sm font-bold [text-align-last:center]"
        id="game-series-picker"
        placeholder="Select Series"
      >
        <option value="BO1" id="BO1">
          Best of 1
        </option>
        <option value="BO3" id="BO3">
          Best of 3
        </option>
        <option value="BO5" id="BO5">
          Best of 5
        </option>
      </select>
    </div>
  );
}
