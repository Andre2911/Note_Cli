import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUS_BAR_HEIGHT =  0;
const HEADER_HEIGHT =  64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
var meses = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", 
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", 
  "DICIEMBRE"
]
var date = new Date();
var dia = date.getDate();
var mes = date.getMonth();
var yyy = date.getFullYear();
var fecha_formateada = dia + ' DE ' + meses[mes] + ' DE ' + yyy;

export const title = () => {
  const [greet, setGreet] = useState('');
  const [ name, setName ] = useState("Invitado")
  const [ fecha, setFecha ] = useState("")

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Buenos Días');
    if (hrs === 1 || hrs < 17) return setGreet('Buenas Tardes');
    setGreet('Bueenos Noches');
  };
  useEffect(()=>{
    findGreet();
    AsyncStorage.getItem("@User").then(er=>{
      setName(er)
      setFecha(fecha_formateada)
    })

  },[])
    return (
      <View style={styles.body}>
        <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold'}}>{greet} {name}</Text>
        <Text style={{color: 'white', fontSize: 13, justifyContent: 'flex-start', marginTop:8,fontWeight: 'bold'}}>{fecha}</Text>
      </View>
    );
  };

export const renderNavBar = (e) => {
  
  // console.log(e,"header")
    const drawer_menu = () => {
      e.navigation.openDrawer();
    }
    return(
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={drawer_menu}>
          <Text style={{color:"#fff",fontSize:19, fontWeight: 'bold'}}>Página de Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconRight} onPress={drawer_menu}>
          {/* <Entypo name="menu" size={35} color="white" /> */}
        </TouchableOpacity>
      </View>
    </View>
  )};

  const styles = StyleSheet.create({
    body: {
      top:40,
      right:50,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    navContainer: {
      height: HEADER_HEIGHT,
      marginHorizontal: 10,
      backgroundColor: '#000'
    },
    statusBar: {
      height: STATUS_BAR_HEIGHT,
      backgroundColor: 'transparent',
    },
    navBar: {
      height: NAV_BAR_HEIGHT,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    titleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    body2: {
      display: 'flex',
      backgroundColor: '#000',
    }
  });