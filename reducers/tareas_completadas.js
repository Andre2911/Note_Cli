import { 
    RETRIEVE_TAREAS_COMPLETADAS,
    DELETE_TAREA_COMPLETADA} from "../actions/types";


const initialstate = []
const tareasReducer =  (state = initialstate, action) => {
    const { type, payload } = action;
    // const result = await AsyncStorage.getItem('categoria');
    // console.log(result)
    switch (type) {

        case RETRIEVE_TAREAS_COMPLETADAS:
            return payload;
        case DELETE_TAREA_COMPLETADA:
            return payload

        default:
            return state;
    }
}
export default tareasReducer;