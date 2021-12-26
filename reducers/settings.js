import { 
    RETRIEVE_SETTINGS,
    UPDATE_SETTINGS
 } from "../actions/types";

const initialstate = [{time: 3600, short: 300, strictmode: false, auto: true}]
const retrievereducer =  (state = initialstate, action) => {
    // console.log(payload, "payload")
    const { type, payload } = action;

    switch (type) {
        case UPDATE_SETTINGS:
            if (payload.length === 0) return initialstate
            else return payload;
        case RETRIEVE_SETTINGS:
            return payload;

        default:
            return state;
    }
}
export default retrievereducer;