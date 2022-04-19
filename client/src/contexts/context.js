import { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";

export const LanguageContext = createContext();
export const TaskAddFormContext = createContext({
  name: '',
  description: '',
  isCompleted: false,
});

export const tasksContext = createContext([]);
