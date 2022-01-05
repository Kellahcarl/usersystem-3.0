import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../../services/projects.service";
import { updateTask } from "../../services/tasks.service";

import {
  ADD_PROJECT_FAIL,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} from "../types";

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECTS_REQUEST });
    const data = await getAllProjects();
    dispatch({ type: GET_PROJECTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_PROJECTS_FAIL, payload: error.message });
  }
};

export const addProject =
  (name, client_name, start_date, end_date, description) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_PROJECT_SUCCESS,
        payload: await createProject(
          name,
          client_name,
          start_date,
          end_date,
          description
        ),
      });
      dispatch(getProjects());
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: ADD_PROJECT_FAIL,
        payload: error.message,
      });
    }
  };
export const deleteSingleProject = (project_id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      payload: await deleteProject(project_id),
    });
    dispatch(getProjects());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: error.message,
    });
  }
};

export const UpdateSingleProject =
  (project_id, name, client_name, start_date, end_date, description) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROJECT_REQUEST });
      dispatch({
        type: UPDATE_PROJECT_SUCCESS,
        payload: await updateProject(
          project_id,
          name,
          client_name,
          start_date,
          end_date,
          description
        ),
      });
      dispatch(getProjects());
    } catch (error) {
      dispatch({
        type: UPDATE_PROJECT_FAIL,
        payload: error.message,
      });
    }
  };
