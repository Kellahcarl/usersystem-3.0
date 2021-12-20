import { getProjectBoard } from "../../services/user.service";
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
    userdata = localStorage.getItem("user");
    user = JSON.parse(userdata);

    const { data } = await getProjectBoard.get(`${user._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({ type: GET_PROJECTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: GET_PROJECTS_FAIL, payload: error.response.data.message });
  }
};

export const addProject = (project) => async (dispatch) => {
  // console.log(project);
  try {
    dispatch({ type: ADD_PROJECT_REQUEST });
    userdata = localStorage.getItem("user");
    user = JSON.parse(userdata);
    const { data } = await getProjectBoard.post("/", project, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(data);
    dispatch({ type: ADD_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    console.log(error.message);
    dispatch({ type: ADD_PROJECT_FAIL, payload: error.response.data.message });
  }
};
