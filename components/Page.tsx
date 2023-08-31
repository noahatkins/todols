"use client";
import React, {useState, KeyboardEvent, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import Link from "next/link";
import * as ls from "local-storage";
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import TaskBar from "./Taskbar/TaskBar";
import Tasks from "./Tasks/Tasks";
import VerticalSpacer from "./Spacers/VerticalSpacer";
import HorizontalSpacer from "./Spacers/HorizontalSpacer";

interface ListItem {
  id: string;
  input: string;
  status: string;
  priority: boolean;
}

interface Filters {
  complete: boolean;
  incomplete: boolean;
  priority: boolean;
}

export const Page = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<ListItem[]>([]);
  const [filteredList, setFilteredList] = useState<ListItem[]>([]);
  const [filters, setFilters] = useState<Filters>({complete: false, incomplete: false, priority: false});

  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme();

  if (theme === "system") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input !== "") {
      const newItem: ListItem = {
        id: uuidv4(),
        input,
        status: "incomplete",
        priority: false,
      };
      setList([...list, newItem]);
      setInput("");
    }
  };

  const handleItemStatus = (task: ListItem) => {
    const taskItem = list.find((item: ListItem) => item.id === task.id);
    if (taskItem) {
      taskItem.status = taskItem.status === "complete" ? "incomplete" : "complete";
      setList([...list]);
    }
  };

  const handleItemPriority = (task: ListItem) => {
    const taskItem = list.find((item: ListItem) => item.id === task.id);
    if (taskItem) {
      taskItem.priority = !taskItem.priority;
      setList([...list]);
    }
  };

  const handleItemDelete = (id: string) => {
    const filteredList = list.filter((item: ListItem) => item.id !== id);
    setList(filteredList);
  };

  useEffect(() => {
    const filtered = list.filter((task: ListItem) => {
      const completeCondition = !filters.complete || task.status === "complete";
      const incompleteCondition = !filters.incomplete || task.status === "incomplete";
      const priorityCondition = !filters.priority || task.priority;

      return completeCondition && incompleteCondition && priorityCondition;
    });
    setFilteredList(filtered);
  }, [list, filters]);

  useEffect(() => {
    setMounted(true);
    const storedList = ls.get<ListItem[]>("list");
    if (storedList) {
      setList(storedList);
    }
  }, []);

  useEffect(() => {
    const storedList = ls.get<ListItem[]>("list");

    if (list.length > 0 && JSON.stringify(list) !== JSON.stringify(storedList)) {
      ls.set("list", list);
    }
    if (list.length === 0 && storedList && storedList.length > 0) {
      ls.set("list", []);
    }
  }, [list]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen w-full dark:bg-slate-900 text-slate-700 dark:text-gray-100 overflow-y-scroll ease-linear transition-all duration-75">
      <div className="flex items-center w-full p-5">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <Link href="https://noahatkins.com" target="_blank">
              <img src={theme === "dark" ? "/logo_gray_100.png" : "/logo_slate_700.png"} height={40} width={40} />
            </Link>
            <HorizontalSpacer size={10} />
            <div className="text-2xl font-bold">todols</div>
          </div>
          <button
            className={` cursor-pointer  hover:text-yellow-400 dark:hover:text-yellow-400 duration-75 dark:text-gray-100 text-slate-900 ease-linear transition-colors`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center flex-col items-center grow">
        <VerticalSpacer size={10} />
        <div className="w-full max-w-screen-lg px-5 flex justify-between items-center">What do you want to accomplish?</div>
        <VerticalSpacer size={2} />
        <div className="flex justify-center w-full max-w-screen-lg  px-5">
          <input
            className="focus:border-slate-900 hover:border-gray-400 bg-transparent border-b-2 outline-none h-10 w-full  border-solid border-gray-300 text-gray-500 ease-linear duration-75 transition-all dark:border-slate-700 dark:focus:border-gray-100 dark:text-gray-100 dark:hover:border-slate-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="I want to create a to-do list app.."
            maxLength={100}
          />
        </div>
        <VerticalSpacer size={20} />
        <TaskBar listLength={list.length} filteredListLength={filteredList.length} filters={filters} setFilters={setFilters} />
        <VerticalSpacer size={8} />
        <Tasks
          filteredList={filteredList}
          handleItemStatus={handleItemStatus}
          handleItemPriority={handleItemPriority}
          handleItemDelete={handleItemDelete}
        />
        <VerticalSpacer size={10} />
      </div>
    </div>
  );
};
