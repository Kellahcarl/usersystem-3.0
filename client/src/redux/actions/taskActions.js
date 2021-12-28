import {
  getAllTasks,
  assignUserTask,
  getSingleTask,
  createTask,
} from "../../services/tasks.service";
import {
  ADD_PROJECT_SUCCESS,
  ADD_TASK_FAIL,
  ADD_TASK_REQUEST,
  ASSIGN_TASK_FAIL,
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_TASKS_FAIL,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  COMPLETE_TASK_FAIL,
  COMPLETE_TASK_REQUEST,
  COMPLETE_TASK_SUCCESS,
  UNASSIGN_TASK_REQUEST,
  UNASSIGN_TASK_SUCCESS,
  UNASSIGN_TASK_FAIL,
} from "../types";

export const getTasks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    dispatch({ type: GET_TASKS_SUCCESS, payload: await getAllTasks() });
  } catch (error) {
    dispatch({ type: GET_TASKS_FAIL, payload: error.message });
  }
};

export const assignTask =
  (project_id, task_id, user_id) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_TASK_REQUEST });
      const { data } = await assignUserTask(project_id, task_id, user_id);
      // console.log(data);
      dispatch({ type: ASSIGN_TASK_SUCCESS, payload: data });
      dispatch(getTasks());
    } catch (error) {
      dispatch({
        type: ASSIGN_TASK_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const addTask =
  (project_id, name, start_date, end_date, description, duration) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_TASK_REQUEST });
      const { data } = createTask(
        project_id,
        name,
        start_date,
        end_date,
        description,
        duration
      );
      dispatch({ type: ADD_PROJECT_SUCCESS, payload: data });
      dispatch(getTasks());
    } catch (error) {
      dispatch({ type: ADD_TASK_FAIL, payload: error.response.data.message });
    }
  };
export const completeTask = (project_id, task_id) => async (dispatch) => {
  try {
    dispatch({ type: COMPLETE_TASK_REQUEST });
    const { data } = getSingleTask(project_id, task_id);
    // console.log(data);
    dispatch({ type: COMPLETE_TASK_SUCCESS, payload: data });
    dispatch(getTasks());
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch({
      type: COMPLETE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const unassignTask = (project_id, task_id) => async (dispatch) => {
  try {
    dispatch({ type: UNASSIGN_TASK_REQUEST });
    const { data } = getSingleTask(project_id, task_id);
    // console.log(data);
    dispatch({ type: UNASSIGN_TASK_SUCCESS, payload: data });
    dispatch(getTasks());
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch({
      type: UNASSIGN_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteTask = (task_id) => async (dispatch) => {
  console.log("delete task");
  try {
    dispatch({ type: DELETE_TASK_REQUEST });
    const { data } = deleteTask(task_id);
    dispatch({ type: DELETE_TASK_SUCCESS, payload: data });
    console.log(data);
    dispatch(getTasks());
  } catch (error) {
    dispatch({ type: DELETE_TASK_FAIL, payload: error.response.data.message });
  }
};
