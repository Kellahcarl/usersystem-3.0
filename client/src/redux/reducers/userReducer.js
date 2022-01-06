import {
  GET_UNASSIGNEDUSERS_FAIL,
  GET_UNASSIGNEDUSERS_REQUEST,
  GET_UNASSIGNEDUSERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from "../types";

const initialState = {
  users: [],
  unassignedUsers: [],
  error: null,
  loading: false,
};
const initialState1 = {
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

export const unassignedUsersReducer = (
  state = initialState1,
  { type, payload }
) => {
  switch (type) {
    case GET_UNASSIGNEDUSERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_UNASSIGNEDUSERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_UNASSIGNEDUSERS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
