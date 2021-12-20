import { GET_TASKS_FAIL, GET_TASKS_REQUEST, GET_TASKS_SUCCESS } from "../types";

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
