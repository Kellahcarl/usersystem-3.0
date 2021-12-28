import {
  GET_ASSIGNED_USERS_PROJECT_FAIL,
  GET_ASSIGNED_USERS_PROJECT_REQUEST,
  GET_ASSIGNED_USERS_PROJECT_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from "../types";

const initialState = {
  users: [],
  error: null,
  loading: false,
};

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const assignedUsers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ASSIGNED_USERS_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ASSIGNED_USERS_PROJECT_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_ASSIGNED_USERS_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
