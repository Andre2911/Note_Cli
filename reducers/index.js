import { combineReducers } from "redux";
import auth from "./auth";
import categorias from './categorias';
import tareas from './tareas';
import settings from './settings';
import tiempo from './time_history';
import tareas_completadas from './tareas_completadas';

export default combineReducers({
    auth,
    categorias,
    tareas,
    settings,
    tiempo,
    tareas_completadas
  });