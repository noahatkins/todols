import React from "react";
import {Check, Star, Trash} from "lucide-react";
import HorizontalSpacer from "../Spacers/HorizontalSpacer";

interface ListItem {
  id: string;
  input: string;
  status: string;
  priority: boolean;
}

interface TasksProps {
  filteredList: ListItem[];
  handleItemStatus: (task: ListItem) => void;
  handleItemPriority: (task: ListItem) => void;
  handleItemDelete: (id: string) => void;
}

const Tasks: React.FC<TasksProps> = ({filteredList, handleItemStatus, handleItemPriority, handleItemDelete}) => {
  return (
    <div className="w-full max-w-screen-lg px-5  grow">
      {filteredList.map((task: ListItem) => (
        <div key={task.id}>
          <div className="h-1"></div>
          <div
            className={`flex items-center justify-between  dark:bg-slate-600/10 dark:border-slate-900/10 rounded-md w-full h-20 px-5 text-md  border-solid border-2 border-gray-200 hover:scale-[1.007] transition-transform ease-linear duration-75`}
          >
            <div className="flex items-center grow">
              <div
                className={`flex items-center justify-center h-7 w-7 rounded-full border-2 cursor-pointer ease-linear duration-75 transition-all   ${
                  task.status === "complete"
                    ? "bg-blue-600 border-blue-600"
                    : "hover:border-blue-600 border-gray-200 dark:border-slate-700 dark:hover:border-blue-600"
                }`}
                onClick={() => handleItemStatus(task)}
              >
                {task.status === "complete" && (
                  <div className="text-gray-100">
                    <Check size={20} />
                  </div>
                )}
              </div>
              <HorizontalSpacer size={30} />
              <div
                className={`truncate max-w-[100%] w-2 grow  ${
                  task.status === "complete" ? "line-through text-gray-300 dark:text-slate-700" : "text-gray-500 dark:text-slate-400"
                }`}
              >
                {task.input}
              </div>
            </div>
            <HorizontalSpacer size={30} />

            <div className="flex items-center">
              <div
                className={`${
                  task.priority ? "text-yellow-500" : "hover:text-yellow-500 text-yellow-300"
                } cursor-pointer ease-linear duration-75 transition-all`}
                onClick={() => handleItemPriority(task)}
              >
                <Star size={20} strokeWidth={2} fill={`${task.priority ? "#eab308" : "transparent"} `} />
              </div>
              <div className="w-2"></div>
              <div className="text-red-300 hover:text-red-500 ease-linear duration-75 transition-all" onClick={() => handleItemDelete(task.id)}>
                <Trash size={18} strokeWidth={2} />
              </div>
            </div>
          </div>
          <div className="h-1"></div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
