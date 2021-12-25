import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput,StatusBar } from 'react-native';

function HomeScreen(e) {
  const [number, onChangeNumber] = React.useState(null);
  const [press, setPress] = React.useState({
    bool: true,
    background: "rgba(124,98,21,1)"});

  const onPress = () => {
    e.navigation.navigate('Register3',{nombre: number});
  }
  const onChangeText = (text) => {
    onChangeNumber(text);
    setPress({
      bool:false,
      background:"#E0AD12"
    })
  }
    return (
      <View style={styles.background}>
        <View style={styles.cabezera}>
            <Text style={styles.circulo}></Text>
            <Text style={styles.text_cabezera}>Entendido</Text>
        </View>
        <Text style={styles.text}>Indica tu nombre</Text>

        <View style={styles.input}>
            <TextInput
              style={styles.input_text}
              onChangeText={(text)=>onChangeText(text)}
              value={number}
              textAlign="center"
              placeholderTextColor="#7a7a7a"
              placeholder="indica tu nombre"
              inlineImagePadding={20}
          />
        </View>
        <Text style={styles.description}>Usaremos esta información para usos de la aplicacion</Text>
        <TouchableOpacity style={[styles.button_design,{backgroundColor: press.background}]} onPress={onPress} disabled={press.bool}>
          <Text style={styles.button_text}>CONTINUAR</Text>
        </TouchableOpacity>
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
      fontSize: 35,
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
      borderBottomColor: '#E0AD12',
      // borderRadius: 20,
      borderWidth: 2,
    },
    description: {
      color: '#fff',
      fontSize: 13,
      textAlign: 'justify',
      marginTop: 120,
      marginLeft: 40,
      marginRight: 40,
    },
    button_text: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    },
    button_design: {
      padding: 10,
      paddingHorizontal: 80,
      borderRadius: 30,
      marginVertical: 30,
    },
    input:{
      flex:1,
      width: '100%',
      height: '100%',
      marginTop:50,
      textAlign: 'center',      
      justifyContent: 'center',

    },
    background:{
        backgroundColor: "rgba(0,0,0,1)",
        display: "flex",
        flex:1,
        alignItems: "center",
    }
  });
export default HomeScreen;