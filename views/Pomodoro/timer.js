import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text,TouchableOpacity, BackHandler, StatusBar, Alert } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Circle from './circle';
import BackgroundTimer from "react-native-background-timer";
import { useDispatch, useSelector } from 'react-redux';
import {retrieveSettings} from '../../actions/settings';
import {updateTarea, retrieveTarea,eliminar_tarea} from '../../actions/tareas';
import { tarea_update_time } from '../../actions/time_history';
import { eliminar_tarea_completada } from '../../actions/tareas_completadas';

export const Timer = ({...e}) => {

    const datos = e.route.params
    const [metodo, setMetodo] = React.useState({metodo: "Pomodoro", time: 0});
    const [status, setStatus] = React.useState(false);
    const [data, setData] = React.useState({status: true});
    const [started, setStarted] = React.useState(datos.status);
    const [progress, setProgress] = React.useState(0);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [timerOn, setTimerOn] = useState(false);
    
    const dispatch = useDispatch()
    // console.log(data, "dataaaaaaa")
    const settings = useSelector(state => state.settings[0]);
    const {time, short, strictmode, auto} = settings;
    const tiempo = time - secondsLeft
    const f = new Date()
    const fecha = new Date(f.getFullYear(), f.getMonth(), f.getDate())

    useEffect(() => {

        if (timerOn) startTimer();
        else BackgroundTimer.stopBackgroundTimer();
        return () => {
          BackgroundTimer.stopBackgroundTimer();
        };
      }, [timerOn]);

    useEffect(() => {
        setProgress(100*secondsLeft/time);
        if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer()
      }, [secondsLeft])
    
    useEffect(() => {
        dispatch(retrieveSettings())
        dispatch(retrieveTarea(datos.categoria, datos.id))
        .then((ea)=>{
            console.log(ea, "useEffect")
            setData(ea)})
    },[dispatch])
    useEffect(() => {
        setSecondsLeft(time)
    },[])
    
    useEffect(() => {
        const backAction = () => {
          Alert.alert("Choto mate, seguro que quieres salir :´v?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => handlePressEnd }
          ]);
          return true;
        };
        if (status===true){
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
              );
              return () => backHandler.remove();
        }

      }, [status]);


      const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
          setSecondsLeft(secs => {
            if (secs > 0) return secs - 1
            else return 0
          })
        }, 1000)
      }

    const clockify = () => {
        let hours = Math.floor(secondsLeft / 60 / 60)
        let mins = Math.floor((secondsLeft / 60) % 60)
        let seconds = Math.floor(secondsLeft % 60)
        let displayHours = hours < 10 ? `0${hours}` : hours
        let displayMins = mins < 10 ? `0${mins}` : mins
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds
        return {
          displayHours,
          displayMins,
          displaySecs,
        }
      }
    
    const HandlePressTemp = () => {
        setProgress(100)
        setMetodo({metodo: "Temporizador"})
    }
    const HandlePressCrono = () => {
        setMetodo({metodo: "Cronómetro"})
        setProgress(0)
    }
    const HandlePressPomodoro = () => {
        setMetodo({metodo: "Pomodoro"})
        setProgress(0)
    }
    const handlePressStart = () => {
        setTimerOn(timerOn => !timerOn)
        setStatus(true)
        const actualizar_tarea = {
            id: datos.id,
            name: datos.extraData,
            categoria: datos.categoria,
            status: true,
            mode: metodo.metodo,
            time: metodo.time
        }
        console.log(actualizar_tarea,"datos enviados a actions")
        dispatch(updateTarea(actualizar_tarea))
        dispatch(retrieveTarea(datos.categoria, datos.id))
        data.status = true
    }
    const handlePressStatus = () => {
        setTimerOn(timerOn => !timerOn)
        setStatus(a => !a)
    }

    const handlePressEnd = () => {
        const actualizar_tarea = {
            id: datos.id,
            name: datos.extraData,
            categoria: datos.categoria,
            status: true,
            mode: metodo.metodo,
            time: tiempo
        }
        dispatch(updateTarea(actualizar_tarea))
        dispatch(tarea_update_time(datos.id,tiempo,datos.extraData, datos.categoria,fecha ))
        e.navigation.navigate("Categorie",{titulo: datos.categoria})
    }


    const fin_tarea = () => {
        const actualizar_tarea = {
            id: datos.id,
            name: datos.extraData,
            categoria: datos.categoria,
            status: true,
            mode: metodo.metodo,
            time: tiempo
        }
        dispatch(updateTarea(actualizar_tarea)).
        then(() => {
            dispatch(eliminar_tarea(datos.id, datos.categoria))
        .then((es)=>{
            dispatch(eliminar_tarea_completada(datos.categoria, es))
        })
        })
        dispatch(tarea_update_time(datos.id,tiempo,datos.extraData, datos.categoria,fecha ))

        
        // dispatch()
        e.navigation.navigate("Categorie",{titulo: datos.categoria})
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container_header}>
                <TouchableOpacity onPress={()=>e.navigation.goBack()}>
                    <MaterialIcons name="close" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{metodo.metodo}</Text>

                <TouchableOpacity onPress={()=>e.navigation.navigate('settings')}>
                    {!status && 
                    <MaterialIcons name="settings" size={20} color="white" />
                    }
                </TouchableOpacity>
                      
            </View>
            <Text style={styles.tarea}>{datos.extraData}</Text>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop:23}}>
                <View style={{position:'absolute'}}>

                    <Text style={styles.time_text}>
                    {clockify().displayHours} :{clockify().displayMins} {" : "}
                    {clockify().displaySecs}</Text>

                </View>
                <Circle
                    progress={progress}/>
            </View>
            {data.status || datos.status ?
            /////
            status ?
            <TouchableOpacity style={styles.button} onPress={()=>handlePressStatus()}>
                <Text style={styles.text}>Parar</Text>
            </TouchableOpacity>
            :
            <View style={styles.continuar_s}>
                <TouchableOpacity style={[styles.button,{marginTop:110}]} onPress={()=>handlePressStatus()}>
                    <Text style={styles.text}>Continuar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{marginTop:20, width:150}]} onPress={()=>handlePressEnd()}>
                <Text style={styles.text}>Continuar más Tarde</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{marginTop:20, width:150}]} onPress={()=>fin_tarea()}>
                <Text style={styles.text}>Finalizar</Text>
                </TouchableOpacity>
            </View>
            /////
            :
            <TouchableOpacity style={styles.button} onPress={()=>handlePressStart()}>
                <Text style={styles.text}>Comenzar</Text>
            </TouchableOpacity>
            }
            {data.status ? 
            <></>
            :
            <View style={styles.container_footer}>
                <TouchableOpacity onPress={()=>HandlePressPomodoro()} >
                    <MaterialIcons name="timer" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>HandlePressTemp()}>
                <MaterialIcons name="history" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>HandlePressCrono()}>
                <MaterialIcons name="update" size={20} color="white"/>
                </TouchableOpacity>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'column',
    },
    container_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    container_footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 100,
        top: 50,
        alignSelf: 'auto',
    },
    title: {
        color: 'white',
        fontSize: 14,
    },
    tarea: {
        color: 'white',
        fontSize: 18,
        // margin: 20,
        textAlign: 'center',
        marginVertical: 80
    },
    button: {
        borderWidth: 1,
        borderColor: '#727272',
        width: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginTop: 110,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },
    time_text:{
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
    },
    continuar_s: {
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
