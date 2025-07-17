import React from "react";

interface Props {
  currentFilter: string;
  onChange: (filter: string) => void;
}

const filters = ["all", "completed", "pending"];

const Filter: React.FC<Props> = ({ currentFilter, onChange }) => {
  return (
    <div className="flex justify-center gap-4 mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-2 rounded-md ${
            currentFilter === f
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filter;
