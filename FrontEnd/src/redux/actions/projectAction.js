import { getAllProjects } from "../../services/projects.service";

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

export const addProject = (project) => async (dispatch) => {
  // console.log(project);
  try {
    dispatch({ type: ADD_PROJECT_REQUEST });

    dispatch({ type: ADD_PROJECT_SUCCESS, payload: "animationstart" });
  } catch (error) {
    console.log(error.response.data.message);
    console.log(error.message);
    dispatch({ type: ADD_PROJECT_FAIL, payload: error.response.data.message });
  }
};
