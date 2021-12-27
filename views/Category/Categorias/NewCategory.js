import React, {useEffect, useState} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
import { useDispatch } from 'react-redux';
import { createCategoria } from '../../../actions/categorias'
import { createTarea } from '../../../actions/tareas'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewCategory = ({close, actividad, categoria}) => {
  const [number, onChangeNumber] = React.useState(null);
  
  const dispatch = useDispatch();
  const fecha = Date.now();

  const creandoCategoria = async () => {
    if (number == null) {
      alert('Ingrese un nombre')
    }else{
      switch(actividad){
        case 'Tarea':
          dispatch(createTarea(number, categoria, fecha))
          close({id: fecha,name: number, status: false, time: 0, mode: "Pomodoro"})
          break;
        case 'Categoría':
          dispatch(createCategoria(number, getRandomColor()))
          close()
          break;
        default:
          alert(`No se pudo crear la ${actividad}`)
      }
      
      
    }
    // close()
  }
  const getRandomColor = () => {
    var num=(Math.floor(Math.random()*4)*4).toString(16);
    var letters = ['0','F',num];
    var color = '#';
    
    for (var i = 0; i < 3; i++ ) {
        let pos=Math.floor(Math.random() * letters.length);
        color += letters[pos];
        letters.splice(pos,1);
    }

    return color;
}
    return(
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Crear Nueva {actividad}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                textAlign='center'
                placeholder={`Ingrese la ${actividad}`}
                placeholderTextColor="#7a7a7a"
                inlineImagePadding={20}
              />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => creandoCategoria()}
            >
              <Text style={styles.textStyle}>Crear</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 35,
        paddingHorizontal: 35,
        paddingBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 200,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#E0AD12",
      },
      textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        color: '#000'
      },
      input: {
        height: 40,
        color: '#000',
        width: 190,
        margin: 12,
        marginBottom:20,
        padding: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1
      },
})
export default NewCategory;