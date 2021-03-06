import {
    RETRIEVE_TIEMPO,
    UPDATE_TIEMPO,
    COMPLETED_TIEMPO
} from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from "@babel/core";

export const retrieveTiempo_categoria = (categoria) => async (dispatch) => {
    const tiempo = await AsyncStorage.getItem(`tiempo-${categoria}`);
    const parseResult = tiempo === null ? [] : JSON.parse(tiempo)
    
    try {
        dispatch({
            type: RETRIEVE_TIEMPO,
            payload: parseResult,
        });
    } catch (err) {
        console.log(err,"ACTION_Tiempo");
    }
}

export const tarea_update_time = (id, tiempo, nombre, categoria, dia) => async(dispatch) => {
    
    const result = await AsyncStorage.getItem(`tiempo-${categoria}`);
    const parseResult = result === null ? [] : JSON.parse(result)
    const data = [{[dia]:[{id: id, tiempo:tiempo, nombre: nombre, categoria: categoria, }]}]
    const data2 = {[dia]:[{id: id, tiempo:tiempo, nombre: nombre, categoria: categoria}]}

    const fech = parseResult.some((a)=> {
        return new Date(Object.keys(a)[0]).getTime() == new Date(dia.getFullYear(), dia.getMonth(), dia.getDate()).getTime()
    })
    console.log(fech,"some")
    //si es menor estamos en un nuevo DIA
    //si es mayor estamos en el mismo dia 
   

    if (result == null){    
        try{
            await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(data))
            dispatch({
                type: UPDATE_TIEMPO,
                payload:[{[dia]:[{id: id, tiempo:tiempo, nombre: nombre, categoria: categoria, }]}]
            })
        }catch{
            console.log("ERROR1")
        }
    }else{
            
    var key2 = ""
    console.log(parseResult)
    console.log("entro aqui xd",parseResult.find((a)=> {
        key2 = Object.keys(a)[0]
        console.log("line 55 ", new Date(Object.keys(a)[0]).getTime(), new Date(dia.getFullYear(), dia.getMonth(), dia.getDate()).getTime())
        return new Date(Object.keys(a)[0]).getTime() == new Date(dia.getFullYear(), dia.getMonth(), dia.getDate()).getTime()
    }))


        if (fech){ //Si estamos en el mismo dia 
            const fechas_incluidas = parseResult.find((a)=> {
                key2 = Object.keys(a)[0]
                return new Date(Object.keys(a)[0]).getTime() == new Date(dia.getFullYear(), dia.getMonth(), dia.getDate()).getTime()
            })[`${key2}`].map(a=>a.id) // Array con todos los id de las tareas 
        
            console.log("ESTAMOS EN EL MISMO DIA")
            var key = ""
            let DA = parseResult.find((a)=> {
                key = Object.keys(a)[0]
                return new Date(Object.keys(a)[0]).getTime() == new Date(dia.getFullYear(), dia.getMonth(), dia.getDate()).getTime()
            })
            // console.log(DA,"DA95")
            if (fechas_incluidas.includes(id)){
                console.log("si esta en la lista")
                console.log(DA[key].find(a=>a.id == id).tiempo,"dadr")
                try{
                    DA[key].find(a=>a.id == id).tiempo = DA[key].find(a=>a.id == id).tiempo+tiempo
                    

                    // console.log(parseResult,"line 101 timehostory")
                    console.log(parseResult,"line 82")
                    await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(parseResult))
                    dispatch({
                        type: UPDATE_TIEMPO,
                        payload: parseResult
                    })
                }catch{
                    console.log("ERROR2")
                }

            }else{
                DA[key].push({id: id, tiempo:tiempo, nombre: nombre, categoria: categoria })
                await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(parseResult))
                console.log(parseResult,"line 95")
                dispatch({
                    type: UPDATE_TIEMPO,
                    payload: parseResult
                })
            }

        }else{  //Si estamos en un dia diferente
            console.log("disitinto dia")
            const objectResult = JSON.parse(result).map((item) => item);
            objectResult.push(data2)
            console.log("ES UN NUEVO DIA :V")
            await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(objectResult))
            dispatch({
                type: UPDATE_TIEMPO,
                payload: objectResult
            })
        }
        }

}   
