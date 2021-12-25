import { 
    RETRIEVE_TAREAS,
    CREATE_TAREA} from "./types";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  
  export const retrieveTareas = (categoria) => async (dispatch) => {
    try {
      const result = await AsyncStorage.getItem(`categoria-${categoria}`);
      const parseResult = result === null ? [] : JSON.parse(result)
  
      dispatch({
        type: RETRIEVE_TAREAS,
        payload: parseResult,
      });
    } catch (err) {
      console.log(err,"ACTION_TAREAS");
    }
  };
  
  export const createTarea = (name, categoria) => async (dispatch) => {
    const result = await AsyncStorage.getItem(`categoria-${categoria}`); //Array
    const tarea1 = [{name: name}];
    const tarea2 = {name: name}

    if(result == null){
      try{
        await AsyncStorage.setItem(`categoria-${categoria}`, JSON.stringify(tarea1))
        dispatch({
          type: CREATE_TAREA,
          payload: [{name: name}]
        })
      }catch{
          console.log("ERROR1")
      }
    }else{
      const objectResult = JSON.parse(result).map((item) => item);
      const create = [...objectResult, tarea2];
      const completed = await AsyncStorage.setItem(`categoria-${categoria}`, JSON.stringify(create))

      try{
        dispatch({
          type: CREATE_TAREA,
          payload: [...objectResult,{name: name}]
        })
      }catch{
          console.log("ERROR2")
      }
    }
    
      
  }