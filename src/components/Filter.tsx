import React from "react";
import { Filters } from "../utils/defaultStates";

interface Props {
  currentFilter: string;
  onChange: (filter: string) => void;
}

const Filter: React.FC<Props> = ({ currentFilter, onChange }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {Filters.map((f) => (
        <div
          key={f.value}
          onClick={() => onChange(f.value)}
          className={` flex w-full p-3 rounded-xl hover:cursor-pointer group text-lg font-semibold ${
            currentFilter === f.value ? "bg-background-200 " : "bg-white"
          }`}
        >
          <span
            className={`transition-all duration-200 ${
              currentFilter === f.value ? "" : "group-hover:scale-105"
            }`}
          >
            {f.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Filter;
