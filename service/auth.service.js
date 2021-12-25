
import http from "../http-common";


export const checkAuthTimeout = expirationTime => {
  return dispatch => {
      setTimeout(() => {
          // dispatch(logout());
      }, expirationTime * 1000)
  }
}

const login = (data) =>{

  return http.post("/api/token/", { username: data.email, password: data.password})

}
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user')
}
const loginService = {
  login,
  logout,
}
export default loginService
