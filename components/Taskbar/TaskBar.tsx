import React from "react";
import {FilterButton} from "../Buttons/FilterButton";

interface Filters {
  complete: boolean;
  incomplete: boolean;
  priority: boolean;
}

interface TaskBarProps {
  listLength: number;
  filteredListLength: number;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const TaskBar: React.FC<TaskBarProps> = ({listLength, filteredListLength, filters, setFilters}) => {
  return (
    <div className="w-full max-w-screen-lg px-5">
      {listLength > 0 && (
        <div className="flex justify-between items-center taskbar">
          <div>{filteredListLength === 1 ? "1 Task" : filteredListLength + " Tasks"}</div>
          <div className="flex filters">
            <FilterButton boolean={filters.complete} setFilters={setFilters} field="complete" />
            <div className="w-2"></div>
            <FilterButton boolean={filters.incomplete} setFilters={setFilters} field="incomplete" />
            <div className="w-2"></div>
            <FilterButton boolean={filters.priority} setFilters={setFilters} field="priority" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBar;
