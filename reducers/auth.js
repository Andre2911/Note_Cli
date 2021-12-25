import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";


  const initialState = false
    ? { isLoggedIn: true}
    : { isLoggedIn: false, user: null};
  
  export default function lol(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          payload: {user: payload.user}
        };
      case LOGIN_FAIL:
        return {
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }
  