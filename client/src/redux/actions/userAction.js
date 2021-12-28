import { getassignedUser } from "../../services/projects.service";
import {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} from "../../services/user.service";

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_ASSIGNED_USERS_PROJECT_REQUEST,
  GET_ASSIGNED_USERS_PROJECT_SUCCESS,
  GET_ASSIGNED_USERS_PROJECT_FAIL,
} from "../types";

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });
    dispatch({ type: GET_USERS_SUCCESS, payload: await getAllUsers() });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error.message });
  }
};
export const getAssignedUsers = (project_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ASSIGNED_USERS_PROJECT_REQUEST });
    dispatch({
      type: GET_ASSIGNED_USERS_PROJECT_SUCCESS,
      payload: await getassignedUser(project_id),
    });
  } catch (error) {
    dispatch({ type: GET_ASSIGNED_USERS_PROJECT_FAIL, payload: error.message });
  }
};
