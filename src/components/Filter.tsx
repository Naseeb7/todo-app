import React from "react";
import { Filters } from "../utils/defaultStates";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  currentFilter: string;
  onChange: (filter: string) => void;
}

const Filter: React.FC<Props> = ({ currentFilter, onChange }) => {
  return (
    <div className="flex sm:flex-col gap-3 w-full relative">
      {Filters.map((f) => {
        const isSelected = currentFilter === f.value;

        return (
          <div
            key={f.value}
            onClick={() => onChange(f.value)}
            className={`relative flex w-full py-2 sm:p-3 rounded-xl justify-center sm:justify-start group xs:text-lg font-semibold
    ${isSelected ? "" : "bg-white"}
    hover:cursor-pointer transition-all overflow-hidden`}
          >
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-background-200 rounded-xl -z-10 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            <span
              className={`transition-transform duration-200 z-10 ${
                isSelected ? "scale-100" : "group-hover:scale-105"
              }`}
            >
              {f.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
