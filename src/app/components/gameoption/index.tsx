import { useAppContext } from "@/store/context";
import { type Series } from "@/store/types";

interface SeriesPickerProps {
  onSelectSeries: (param: Series) => void;
}

export function SeriesPicker({
  onSelectSeries
}: SeriesPickerProps){

  const { state } = useAppContext();
  const { series, games } = state.draft;

  return (
    <div className="flex items-center justify-center">
      <select
        value={games.length == 0 ? "DEFAULT" : series}
        onChange={(e) => {
          e.stopPropagation();
          const value = e.target.value;
          onSelectSeries(value as Series);
        }}
        className="rounded-md text-sm font-bold bg-gray-700 px-3 h-10 [text-align-last:center] justify-center appearance-none cursor-pointer"
      >
        <option value="DEFAULT" defaultChecked={games.length == 0}>Select Series</option>
        <option value="BO1" defaultChecked={series == "BO1"}>Best of 1</option>
        <option value="BO3" defaultChecked={series == "BO3"}>Best of 3</option>
        <option value="BO5" defaultChecked={series == "BO5"}>Best of 5</option>
      </select>
    </div>
  );
}
