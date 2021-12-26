import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text,TouchableOpacity, Button } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Circle from './circle';
import BackgroundTimer from "react-native-background-timer";
import { useDispatch, useSelector } from 'react-redux';
import {retrieveSettings} from '../../actions/settings';

export const Timer = ({...e}) => {

    const [metodo, setMetodo] = React.useState({metodo: "Pomodoro"});
    const [status, setStatus] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [timerOn, setTimerOn] = useState(false);
    const dispatch = useDispatch()

    const settings = useSelector(state => state.settings[0]);
    const {time, short, strictmode, auto} = settings;
    console.log(settings)

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
    },[dispatch])
    useEffect(() => {
        setSecondsLeft(time)
    },[])
    
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
        setStatus(status => !status)
        // setStatus(prev=>!prev)
    }
    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity onPress={()=>e.navigation.goBack()}>
                    <MaterialIcons name="close" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{metodo.metodo}</Text>
                <TouchableOpacity onPress={()=>e.navigation.navigate('settings')}>
                    <MaterialIcons name="settings" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.tarea}>{e.route.params.extraData}</Text>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop:23}}>
                <View style={{position:'absolute'}}>

                    <Text style={styles.time_text}>
                    {clockify().displayHours} : {clockify().displayMins} {": "}
                    {clockify().displaySecs}</Text>

                
                
                </View>
                <Circle
                    progress={progress}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>handlePressStart()}>
                <Text style={styles.text}>{status ? 'Parar':'Comenzar'}</Text>
            </TouchableOpacity>
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
    }
})
