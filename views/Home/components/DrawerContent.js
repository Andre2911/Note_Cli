import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList
    
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';

export function DrawerContent(props) {
    const [ name, setName ] = useState("Invitado")
    const dispatch = useDispatch();

    useEffect(()=>{
      AsyncStorage.getItem("@User").then(er=>{
        setName(er)
      })
  
    },[])
    const HandlePressLogout = async () => {
      await AsyncStorage.clear()
      dispatch(logout());
    }

    return(
        <View style={{flex:1, backgroundColor: '#181818'}}>
            <DrawerContentScrollView {...props}
            contentContainerStyle={{backgroundColor: '#181818'}}>
              <View style ={styles.container_header}>
              <View style={styles.avatar}>
              </View>
              <Text style ={styles.title_name}>{name}</Text>
              </View>
              <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        <TouchableOpacity style={styles.button_logout} onPress={()=>HandlePressLogout()}>
        <MaterialIcons name="logout" size={24} color="white" />
          <Text style={styles.text_logout} >Salir de Sesión</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
      height: 70,
      width: 70,
      backgroundColor: '#E0AD12',
      borderRadius: 40,
    },
    container_header: {
      marginTop: 20,
      marginLeft: 15,
      flexDirection: 'row',
      marginBottom: 20,
    },
    title_name: {
      alignSelf: 'center',
      color: 'white',
      fontSize: 17,
      marginLeft: 10,
    },
    text_logout: {
      color: 'white',
      marginLeft: 10,
    },
    button_logout: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.2)',
      flexDirection: 'row',
    }
  });