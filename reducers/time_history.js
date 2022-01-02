import { 
    RETRIEVE_TIEMPO,
    UPDATE_TIEMPO,
    COMPLETED_TIEMPO,
 } from "../actions/types";


const initialstate = []
const tareasReducer =  (state = initialstate, action) => {
    const { type, payload } = action;
    // const result = await AsyncStorage.getItem('categoria');
    // console.log(result)
    switch (type) {
        case RETRIEVE_TIEMPO:
            return payload;
        case UPDATE_TIEMPO:
            return payload.find(n => n.id === action.n);
        case COMPLETED_TIEMPO:
            return payload;
        default:
            return state;
    }
}
export default tareasReducer;