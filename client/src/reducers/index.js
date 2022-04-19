import { combineReducers } from "redux";

import counter from "./counter";
import login from "./login"
import taskAddForm from "./taskAddForm"

export const allReducers = combineReducers({
  counter,
  login,
  taskAddForm,
})

export default allReducers;