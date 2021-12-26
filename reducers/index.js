import { combineReducers } from "redux";
import auth from "./auth";
import categorias from './categorias';
import tareas from './tareas';
import settings from './settings';

export default combineReducers({
    auth,
    categorias,
    tareas,
    settings
  });