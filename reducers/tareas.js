import { 
    RETRIEVE_TAREAS,
    DELETE_TAREA,
    CREATE_TAREA,
    UPDATE_TAREA,
 } from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialstate = []
const tareasReducer =  (state = initialstate, action) => {
    const { type, payload } = action;
    // const result = await AsyncStorage.getItem('categoria');
    // console.log(result)
    switch (type) {
        case CREATE_TAREA:
            return payload;
        case RETRIEVE_TAREAS:
            return payload;
        case DELETE_TAREA:
            return state.filter(tarea => tarea.id !== payload.id);
        case UPDATE_TAREA:
            return state.map(tarea => tarea.id === payload.id ? payload : tarea);
        default:
            return state;
    }
}
export default tareasReducer;