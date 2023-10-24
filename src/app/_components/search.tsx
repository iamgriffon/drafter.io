import { IoMdSearch } from "react-icons/io";

interface SearchBarProps {
  value: string;
  onChangeValue: (param: string) => void;
}

export function SearchBox({value, onChangeValue}: SearchBarProps) {

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoMdSearch />
        </div>
        <input
          type="text"
          className="flex w-full max-w-3xl p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-600 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Champion..."
          value={value}
          onChange={(event) => onChangeValue(event.target.value)}
        />
      </div>
    </div>
  );
}
