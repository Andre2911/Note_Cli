import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Image,StatusBar } from 'react-native';
import inicioimage from '../../assets/Imagen1.png';

function HomeScreen(e) {

  const onPress = () => {
    e.navigation.navigate('Register2');
  }

    return (
      <View style={styles.background}>
        <Image source={inicioimage} style={styles.imagen} resizeMode={'cover'} blurRadius={0}/>
        <Text style={styles.text}>XNOTE</Text>
        <Text style={styles.description}>Xote es una aplicación que te dará una experiencia única, rapida y sencilla para agregar tus apuntes, notas, ideas, lista de compras y más.</Text>
        <TouchableOpacity style={styles.button_design} onPress={onPress}>
          <Text style={styles.button_text}>COMENCEMOS</Text>
        </TouchableOpacity>
    <StatusBar barStyle="dark-content"  />
    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.95)',
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: "column",
      flexWrap: "wrap",
      paddingTop:10
    },
    text: {
      color: '#fff',
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 10,
    },
    description: {
      color: '#fff',
      fontSize: 13,
      textAlign: 'justify',
      marginTop: 160,
      marginLeft: 30,
      marginRight: 30,
    },
    button_text: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    },
    button_design: {
      backgroundColor: '#E0AD12',
      padding: 10,
      paddingHorizontal: 80,
      borderRadius: 30,
      marginVertical: 30,
    },
    imagen:{
      width: 290,
      height: 290,
      marginTop:50,
    },
    background:{
        backgroundColor: "rgba(0,0,0,1)",
        display: "flex",
        flex:1,
        alignItems: "center",
    }
  });
export default HomeScreen;