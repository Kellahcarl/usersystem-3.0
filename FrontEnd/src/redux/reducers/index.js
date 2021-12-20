import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { projectReducer } from "./projectReducer";
import { taskReducer } from "./taskReducer";

export default combineReducers({
  auth,
  message,
  projects: projectReducer,
  tasks: taskReducer,
});
