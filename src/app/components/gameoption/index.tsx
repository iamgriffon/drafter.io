import { useAppContext } from "@/store/context";
import { type Series } from "@/store/types";
import { useCallback, useEffect, useState } from "react";

interface SeriesPickerProps {
  onSelectSeries: (param: Series) => void;
}

export function SeriesPicker({ onSelectSeries }: SeriesPickerProps) {
  const { state } = useAppContext();
  const { series, games, id } = state.draft;

  const [placeholder, setPlaceHolder] = useState(true);
  const updatePlaceHolder = useCallback(
    (hasSeries: boolean) => {
      setPlaceHolder(hasSeries);
    },
    [placeholder],
  );

  useEffect(() => {
    if (state.draft.id && state.draft.id.length > 0) {
      updatePlaceHolder(true);
    }
  }, [state.draft.id]);

  return (
    <div className="flex items-center justify-center">
      <select
        value={placeholder ? "DEFAULT" : series}
        onChange={(e) => {
          e.stopPropagation();
          const value = e.target.value;
          onSelectSeries(value as Series);
          setPlaceHolder(false);
        }}
        className="h-10 cursor-pointer appearance-none justify-center rounded-md bg-gray-700 px-3 text-sm font-bold [text-align-last:center]"
        id="game-series-picker"
        placeholder="Select Series"
      >
        <option
          value="DEFAULT"
          id="DEFAULT-PICKER"
          defaultChecked={games.length == 1}
        >
          Select Series
        </option>
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
