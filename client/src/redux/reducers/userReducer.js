import {
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from "../actionTypes";

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
