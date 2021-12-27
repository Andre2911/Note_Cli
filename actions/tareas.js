import { 
    RETRIEVE_TAREAS,
    RETRIEVE_TAREA,
    CREATE_TAREA,
    UPDATE_TAREA} from "./types";
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
  export const retrieveTarea = (categoria,id) => async (dispatch) => {
    try {
      // console.log(categoria, id)
      const result = await AsyncStorage.getItem(`categoria-${categoria}`);
      const parseResult = result === null ? [] : JSON.parse(result)
      return parseResult.find(b => b.id === id);
      // console.log(edit,"action retrieve tarea")
      // dispatch({
      //   type: RETRIEVE_TAREA,
      //   payload: parseResult,
      // });
    } catch (err) {
      console.log(err,"ACTION_TAREAS");
    }
  };
  export const createTarea = (name, categoria, fecha) => async (dispatch) => {
    const result = await AsyncStorage.getItem(`categoria-${categoria}`); //Array
    const tarea1 = [{id: fecha,name: name, status: false, time: 0, mode: "Pomodoro"}];
    const tarea2 = {id: fecha,name: name, status: false, time: 0, mode: "Pomodoro"};


    if(result == null){
      try{
        await AsyncStorage.setItem(`categoria-${categoria}`, JSON.stringify(tarea1))
        console.log(tarea1)
        dispatch({
          type: CREATE_TAREA,
          payload: tarea1
        })
      }catch{
          console.log("ERROR1")
      }
    }else{
      const objectResult = JSON.parse(result).map((item) => item);
      const create = [...objectResult, tarea2];
      await AsyncStorage.setItem(`categoria-${categoria}`, JSON.stringify(create))

      try{
        dispatch({
          type: CREATE_TAREA,
          payload: [...objectResult,tarea2]
        })
      }catch{
          console.log("ERROR2")
      }
    }
    
      
  }

  export const updateTarea = ({
    id,
    categoria, 
    name, 
    status,
    mode,
    time}) => async (dispatch) => {

    const result = await AsyncStorage.getItem(`categoria-${categoria}`);
    const parseResult = result === null ? [] : JSON.parse(result)
    

    var edit = parseResult.find(b => b.id === id);
        edit.name = name
        edit.status = status
        edit.mode = mode
        edit.time = time
    console.log(parseResult,"PARSE")
    await AsyncStorage.setItem(`categoria-${categoria}`, JSON.stringify(parseResult))
    console.log(parseResult,"filtrado")
      try{
        dispatch({
          type: UPDATE_TAREA,
          payload: parseResult
        })
      }catch{
          console.log("ERROR2")
      }
      
  }