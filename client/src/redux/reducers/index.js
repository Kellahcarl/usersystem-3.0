import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { projectReducer } from "./projectReducer";
import { taskOfProjectReducer, taskReducer } from "./taskReducer";
import {
  assignedUsers,
  unassignedUsersReducer,
  usersReducer,
} from "./userReducer";

export default combineReducers({
  auth,
  message,
  projects: projectReducer,
  tasks: taskReducer,
  users: usersReducer,
  assignedUsers,
  unassignedUsers: unassignedUsersReducer,
  tasksOfProject: taskOfProjectReducer,
});
