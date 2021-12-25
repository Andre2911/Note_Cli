import { combineReducers } from "redux";
import auth from "./auth";
import categorias from './categorias';
import tareas from './tareas';

export default combineReducers({
    auth,
    categorias,
    tareas
  });