import { 
    RETRIEVE_CATEGORIAS,
    DELETE_CATEGORIA,
    CREATE_CATEGORIA,
    UPDATE_CATEGORIA,
 } from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialstate = [{name:"General", color: "#7DC8E7"}]
const retrievereducer =  (state = initialstate, action) => {
    const { type, payload } = action;
    // const result = await AsyncStorage.getItem('categoria');
    // console.log(result)
    switch (type) {
        case CREATE_CATEGORIA:
            return payload;
        case RETRIEVE_CATEGORIAS:
            return payload;
        case DELETE_CATEGORIA:
            return state.filter(categoria => categoria.id !== payload.id);
        case UPDATE_CATEGORIA:
            return state.map(categoria => categoria.id === payload.id ? payload : categoria);
        default:
            return state;
    }
}
export default retrievereducer;