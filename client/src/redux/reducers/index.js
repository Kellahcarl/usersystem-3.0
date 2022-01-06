import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { projectReducer } from "./projectReducer";
import {
  taskOfProjectReducer,
  TaskOfUserReducer,
  taskReducer,
} from "./taskReducer";
import { unassignedUsersReducer, usersReducer } from "./userReducer";

export default combineReducers({
  auth,
  message,
  projects: projectReducer,
  tasks: taskReducer,
  users: usersReducer,
  unassignedUsers: unassignedUsersReducer,
  taskOfUser: TaskOfUserReducer,
});
