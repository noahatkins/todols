import React from "react";

interface Filters {
  complete: boolean;
  incomplete: boolean;
  priority: boolean;
}

interface FilterButtonProps {
  boolean: boolean;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  field: keyof Filters;
}
export const FilterButton = ({boolean, setFilters, field}: FilterButtonProps) => {
  return (
    <button
      className={`border-2 border-solid  px-2 py-1 rounded-md  text-sm capitalize ease-linear duration-75 transition-all ${
        boolean
          ? "bg-blue-600 border-blue-600 text-gray-100"
          : "border-gray-200 text-gray-500 hover:border-gray-300 dark:hover:border-slate-400 dark:border-slate-700 dark:text-slate-400"
      }`}
      onClick={() =>
        setFilters((prevFilters: Filters) => {
          const updatedFilters = {...prevFilters};

          if (field === "incomplete") {
            updatedFilters.incomplete = !boolean;
            if (updatedFilters.incomplete) {
              updatedFilters.complete = false;
            }
          } else if (field === "complete") {
            updatedFilters.complete = !boolean;
            if (updatedFilters.complete) {
              updatedFilters.incomplete = false;
            }
          } else if (field === "priority") {
            // Only update priority when it's explicitly set
            updatedFilters.priority = !updatedFilters.priority;
          }

          return updatedFilters;
        })
      }
    >
      {field}
    </button>
  );
};
