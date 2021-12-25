import React, {useRef, useEffect} from 'react'
import { View, StyleSheet, Text,TouchableOpacity, Button } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Circle from './circle';
import TimerText from './components/date'
import BackgroundTimer from "react-native-background-timer";

export const Timer = ({...e}) => {

    const [metodo, setMetodo] = React.useState({metodo: "Pomodoro"});
    const [status, setStatus] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [second, setState] = React.useState(0);
    const time = 5

    let interval;

    useEffect(() => {

    },[status])

    const onStart = () => {
        interval = BackgroundTimer.setInterval(() => {
            this.setState(second + 1
            )
          }, 1000);
        }
    
    const onPause = () => {
            BackgroundTimer.clearInterval(this._interval);
          }

    const onReset = () => {
    this.setState(0)
    BackgroundTimer.clearInterval(this._interval);
    }

    const renderStartButton = () => {
        return (
          <Button 
            title="Start"
            onPress={onStart}
          />
        )
      }

     const renderPauseButton = () => {
        return (
          <Button 
            title="Pause"
            onPress={onPause}
        />
        )
      }

     const  renderResetButton = () => {
        return (
          <Button 
            title="Reset"
            onPress={onReset}
        />
        )
      }
    const handlePressStart = () => {
        switch(metodo){
            case "Pomodoro":

                break;
            case "Temporizador":

                break;
            case "Cronómetro":

                break;
            default:
                break;
        }
        setStatus(prev=>!prev)
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
                    {!status ? 
                    <Text style={styles.time_text}>{second}</Text>
                    // <Text style={styles.time_text}>{'as'}</Text>
                    :
                    <TimerText seconds={time}/>
                    }
                
                
                </View>
                <Circle
                    progress={progress}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>handlePressStart()}>
                <Text style={styles.text}>{status ? 'Parar':'Comenzar'}</Text>
            </TouchableOpacity>
            <View style={styles.container_footer}>
                <TouchableOpacity onPress={()=>setMetodo({metodo: "Pomodoro"})} >
                    <MaterialIcons name="timer" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setMetodo({metodo: "Temporizador"})}>
                <MaterialIcons name="history" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setMetodo({metodo: "Cronómetro"})}>
                <MaterialIcons name="update" size={20} color="white"/>
                </TouchableOpacity>
                {/* {renderStartButton()}
          {renderPauseButton()}
          {renderResetButton()} */}
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
