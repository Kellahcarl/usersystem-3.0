import {
  getAllTasks,
  assignUserTask,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  uncompleteTask,
  unAssignUserTask,
  getTaskOfProject,
  getTasksOfSingleUser,
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
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  UNCOMPLETE_TASK_SUCCESS,
  UNCOMPLETE_TASK_FAIL,
  GET_TASKSOFPROJECT_REQUEST,
  GET_TASKSOFPROJECT_SUCCESS,
  GET_TASKSOFPROJECT_FAIL,
  GET_TASKOFUSER_REQUEST,
  GET_TASKOFUSER_FAIL,
  GET_TASKOFUSER_SUCCESS,
} from "../types";

export const getTasks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    dispatch({ type: GET_TASKS_SUCCESS, payload: await getAllTasks() });
  } catch (error) {
    dispatch({ type: GET_TASKS_FAIL, payload: error.message });
  }
};

export const addTask =
  (project_id, name, duration, start_date, end_date, description) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_TASK_REQUEST });
      const { data } = await createTask(
        project_id,
        name,
        duration,
        start_date,
        end_date,
        description
      );
      dispatch({ type: ADD_PROJECT_SUCCESS, payload: data });
      dispatch(getTasks());
    } catch (error) {
      dispatch({ type: ADD_TASK_FAIL, payload: error.response.data.message });
    }
  };

export const assignTask =
  (project_id, task_id, user_id) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_TASK_REQUEST });
      const data = await assignUserTask(project_id, task_id, user_id);
      dispatch({ type: ASSIGN_TASK_SUCCESS, payload: data });
      dispatch(getTasks());
    } catch (error) {
      dispatch({
        type: ASSIGN_TASK_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const unassignTask = (task_id) => async (dispatch) => {
  try {
    dispatch({ type: UNASSIGN_TASK_REQUEST });
    const { data } = await unAssignUserTask(task_id);
    dispatch({ type: UNASSIGN_TASK_SUCCESS, payload: data });
    dispatch(getTasks());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: UNASSIGN_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editTask =
  (task_id, project_id, name, duration, start_date, end_date, description) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TASK_REQUEST });
      const { data } = await updateTask(
        task_id,
        project_id,
        name,
        duration,
        start_date,
        end_date,
        description
      );
      dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
      dispatch(getTasks());
    } catch (error) {
      dispatch({
        type: UPDATE_TASK_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const deleteSingleTask = (task_id, project_id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: await deleteTask(task_id, project_id),
    });
    dispatch(getTasks());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: DELETE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const completeSingleTask = (task_id) => async (dispatch) => {
  try {
    dispatch({
      type: COMPLETE_TASK_SUCCESS,
      payload: await completeTask(task_id),
    });
    dispatch(getTasks());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: COMPLETE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const unCompleteSingleTask = (task_id) => async (dispatch) => {
  try {
    dispatch({
      type: UNCOMPLETE_TASK_SUCCESS,
      payload: await uncompleteTask(task_id),
    });
    dispatch(getTasks());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: UNCOMPLETE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTaskOfUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TASKOFUSER_REQUEST });
    dispatch({
      type: GET_TASKOFUSER_SUCCESS,
      payload: await getTasksOfSingleUser(),
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_TASKOFUSER_FAIL,
      payload: error.message,
    });
  }
};
