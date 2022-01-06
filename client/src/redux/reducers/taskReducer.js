import {
  GET_TASKOFUSER_FAIL,
  GET_TASKOFUSER_REQUEST,
  GET_TASKOFUSER_SUCCESS,
  GET_TASKSOFPROJECT_FAIL,
  GET_TASKSOFPROJECT_REQUEST,
  GET_TASKSOFPROJECT_SUCCESS,
  GET_TASKS_FAIL,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
} from "../types";

const initialState = {
  loading: false,
  tasks: [],
  error: null,
};

export const taskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASKS_REQUEST:
      return { ...state, loading: true };
    case GET_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: payload };
    case GET_TASKS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const TaskOfUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASKOFUSER_REQUEST:
      return { ...state, loading: true };
    case GET_TASKOFUSER_SUCCESS:
      return { ...state, loading: false, tasks: payload };
    case GET_TASKOFUSER_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
