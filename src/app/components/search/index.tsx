import { IoMdSearch } from "react-icons/io";

interface SearchBarProps {
  value: string;
  onChangeValue: (param: string) => void;
}

export function SearchBox({ value, onChangeValue }: SearchBarProps) {
  return (
    <div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <IoMdSearch />
        </div>
        <input
          type="text"
          className="flex w-full max-w-3xl rounded-lg border border-gray-300 bg-gray-600 p-4 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search Champion..."
          value={value}
          onChange={(event) => onChangeValue(event.target.value)}
          id="champion-search-bar"
        />
      </div>
    </div>
  );
}
