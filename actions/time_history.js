import {
    RETRIEVE_TIEMPO,
    UPDATE_TIEMPO,
    COMPLETED_TIEMPO
} from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from "@babel/core";

export const retrieveTiempo = () => async (dispatch) => {
    const tiempo = await AsyncStorage.getItem("tiempo");
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

export const tarea_completed_time = (time, categoria, tarea,dia) => async (dispatch) => {
    const result = await AsyncStorage.getItem('tiempo'); //Array
    const tiempo = [{name: tarea, time: time, categoria: categoria, dia: dia}];
    const tiempo2 = {name: tarea, time: time, categoria: categoria, dia: dia}
    // console.log(result,"resuklt")
    if(result == null){
        try{
        await AsyncStorage.setItem('categoria', JSON.stringify(tiempo))
        dispatch({
            type: COMPLETED_TIEMPO,
            payload: [{name: tarea, time: time, categoria: categoria, dia:dia}]
        })
        }catch{
            console.log("ERROR1")
        }
    }else{
        const objectResult = JSON.parse(result).map((item) => item);
        const create = [...objectResult, tiempo2];
        const completed = await AsyncStorage.setItem('categoria', JSON.stringify(create))
        // console.log(create, "action create");
        try{
        dispatch({
            type: COMPLETED_TIEMPO,
            payload: [...objectResult,{name: tarea, time: time, categoria: categoria}]
        })
        }catch{
            console.log("ERROR2")
        }
    }
}
export const tarea_update_time = (id, tiempo, nombre, categoria, dia) => async(dispatch) => {
    const result = await AsyncStorage.getItem(`tiempo-${categoria}`);
    const parseResult = result === null ? [] : JSON.parse(result)
    const data = [{[dia]:[{id: id, tiempo:tiempo, nombre: nombre, categoria: categoria, }]}]
    const data2 = {id: id, tiempo:tiempo, nombre: nombre, categoria: categoria}
    let fechas = parseResult.every((a)=> {
        return new Date(Object.keys(a)[0]) < new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(), 23,59)
        
    })
    var key2 = ""
    const fechas_incluidas = parseResult.find((a)=> {
        key2 = Object.keys(a)[0]
        return new Date(Object.keys(a)[0]) < new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(), 23,59)
    })[`${key2}`].map(a=>a.id)
    console.log(fechas_incluidas, "fechas_incluidas")

    if (result == null){    
        try{
            await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(data))
            dispatch({
                type: UPDATE_TIEMPO,
                payload:[{[dia]:[{id: id, tiempo:tiempo, nombre: nombre, categoria: categoria, }]}]
            })
            console.log("siu")
        }catch{
            console.log("ERROR1")
        }
    }else{
        if (fechas){ //Si estamos en el mismo dia 
            var key = ""
            let DA = parseResult.find((a)=> {
                key = Object.keys(a)[0]
                return new Date(Object.keys(a)[0]) < new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(), 23,59)
            })
            if (fechas_incluidas.includes(id)){
                console.log("si esta en la lista")
                try{
                    DA[key].find(a=>a.id == id).tiempo = DA[key].find(a=>a.id == id).tiempo+tiempo
                    await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(parseResult))
                    console.log(parseResult[0])
                }catch{
                    console.log("ERROR2")
                }

            }else{
                DA[key].push({id: id, tiempo:tiempo, nombre: nombre, categoria: categoria })
                await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(parseResult))
                console.log(parseResult[0])
            }

        }else{  //Si estamos en un dia diferente
            const objectResult = JSON.parse(result).map((item) => item);
            // const create = [...objectResult, data2];
            // const completed = await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(create))
            // console.log(create, "action create");
            // try{
            //     dispatch({
            //         type: UPDATE_TIEMPO,
            //         payload:[...objectResult,{[dia]:[{id: id, tiempo:tiempo, nombre: nombre, categoria: categoria, }]}]
            //     })
            //     console.log("siu")
            // }catch{
            //     console.log("ERROR3")
            // }
        }
        // var max = new Date(Math.max.apply(null,arrayFechas));
        // console.log(arrayFechas, "arrayFechas")
        // console.log("valor maximo" ,max)
        // var edit = parseResult.find(b => b.id === id);
        // edit.dia = dia
        // edit.tiempo = tiempo
        // console.log(parseResult,"PARSE")
        // await AsyncStorage.setItem(`tiempo-${categoria}`, JSON.stringify(parseResult))
        // console.log(parseResult,"filtrado")
        // try{
        //     dispatch({
        //     type: UPDATE_TIEMPO,
        //     payload: parseResult
        //     })
        // }catch{
        //     console.log("ERROR2")
        // }
        }


}   
