import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "./types";
  
  // import AuthService from "../service/auth.service";
  
  export const register = (username, email, password) => (dispatch) => {
    // return AuthService.register(username, email, password).then(
    //   () => {
    //     dispatch({
    //       type: REGISTER_SUCCESS,
    //     });

    //     return Promise.resolve();
    //   },
    //   () => {
    //     dispatch({
    //       type: REGISTER_FAIL,
    //     });

  
    //     return Promise.reject();
    //   }
    // );
  };

  export const login = (data) => (dispatch) => {

    // return AuthService.login(email, password).then(
    //   (data) => {
    //       dispatch({
    //         type: LOGIN_SUCCESS,
    //         payload: { user: data.data },
    //       });
    //       return Promise.resolve();
    //   },
    //   (data) => {
    //     dispatch({
    //       type: LOGIN_SUCCESS,
    //       payload: { user: "Invitado" },
    //     });
    //     console.log(data, "error")
  
    //     return Promise.reject();
    //   }
    // )
    dispatch({
      type: LOGIN_SUCCESS,
      payload:  {user: data},
    });
  };
  
  export const logout = () => (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
  