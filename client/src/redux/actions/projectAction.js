import { createProject, getAllProjects } from "../../services/projects.service";

import {
  ADD_PROJECT_FAIL,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
} from "../types";

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECTS_REQUEST });

    dispatch({ type: GET_PROJECTS_SUCCESS, payload: await getAllProjects() });
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
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: ADD_PROJECT_FAIL,
        payload: error.message,
      });
    }
  };
