import { 
    RETRIEVE_TAREAS_COMPLETADAS,
    DELETE_TAREA_COMPLETADA} from "./types";
  import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieve_tareas_completadas = (categoria) => async(dispatch)=> {
    try {
        const result = await AsyncStorage.getItem(`hechas-${categoria}`);
        const parseResult = result === null ? [] : JSON.parse(result)
    
        dispatch({
          type: RETRIEVE_TAREAS_COMPLETADAS,
          payload: parseResult,
        });
      } catch (err) {
        console.log(err,"ACTION_TAREAS");
      }
}
export const eliminar_tarea_completada = (categoria,data) => async(dispatch)=> {
    console.log(categoria, data)
    const result_hecho = await AsyncStorage.getItem(`hechas-${categoria}`);
    const parseResult2 = result_hecho === null ? [] : JSON.parse(result_hecho)
    var create
    if (parseResult2==null){
        console.log("VACIO")
        await AsyncStorage.setItem(`hechas-${categoria}`, JSON.stringify(data))
      }else{
        console.log("NO VACIO")
        create = [...parseResult2, data[0]];
        await AsyncStorage.setItem(`hechas-${categoria}`, JSON.stringify(create))
      }
    console.log(create,"tareas action hechas")
    try{
        dispatch({
          type: DELETE_TAREA_COMPLETADA,
          payload: create
        })
      }catch{
          console.log("ERROR2")
      }
    }  

