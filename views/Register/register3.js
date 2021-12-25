import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,StatusBar } from 'react-native';
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen(e) {

    const dispatch = useDispatch();
    const onPress = () => {
      dispatch(login({email: "andre7",password: "123456", user: e.route.params.nombre}));
      const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@User', value)
        } catch (err) {
          console.log("No se almaceno el usario en AsyncStorage", err)
        }
      }
      storeData(e.route.params.nombre);
    }

    return (
      <View style={styles.background}>
        <View style={styles.cabezera}>
            <Text style={styles.circulo}></Text>
            <Text style={styles.text_cabezera}>De acuerdo,¡último paso!</Text>
        </View>
        <Text style={styles.text}>Démosle el toque final a tu cuenta de XNote</Text>

        <View style={styles.input}>
            <TouchableOpacity style={styles.button_design}>
              {/* <AntDesign name="google" size={24} color="white" /> */}
              <Text style={styles.button_text}>REGISTRARME CON GOOGLE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_design}>
            {/* <FontAwesome5 name="facebook" size={24} color="#3b5998" /> */}
            <Text style={[styles.button_text, {color: '#3b5998'}]}>REGISTRARME CON FACEBOOK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button_design,{alignItems: 'center'}]} onPress={()=>onPress()}>
            <Text style={styles.button_text}>CONTINUAR COMO INVITADO</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.description}>Si continuas, acpetas los Terminos y Condiciones y la Pólitica de privacidad de XNote</Text>
    <StatusBar  barStyle="dark-content"  />
    </View>
    );
  }

  const styles = StyleSheet.create({
    cabezera: {
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop:30,

    },
    text: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 25,
    },
    circulo: {
      height: 40,
      width: 40,
      backgroundColor: '#E0AD12',
      borderRadius: 50,

    },
    text_cabezera: {
      color: '#fff',
      fontSize: 17,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    input_text: {
      height: 50,
      margin: 29,
      color: '#fff',
      fontSize: 30,
      borderColor: '#E0AD12',
      borderRadius: 20,
      borderWidth: 2,
    },
    description: {
      color: '#fff',
      fontSize: 13,
      textAlign: 'center',
      marginTop: 1,
      marginBottom: 30,
      marginLeft: 20,
      marginRight: 20,
    },
    button_text: {
      color: '#fff',
      fontSize: 15,
      marginLeft: 10,

    },
    button_design: {
        marginHorizontal: 20,
        borderColor: '#fff',
        borderWidth: 1,
        padding: 18,
        borderRadius: 30,
        marginVertical: 10,
        justifyContent: 'center',
        flexDirection: 'row',

    },
    input:{
      flex:1,
      width: '100%',
      height: '100%',
      marginTop:50,
      textAlign: 'center',
      paddingBottom: 65,     
      justifyContent: 'flex-end',



    },
    background:{
        backgroundColor: "rgba(0,0,0,1)",
        display: "flex",
        flex:1,
        alignItems: "center",
    }
  });
export default HomeScreen;