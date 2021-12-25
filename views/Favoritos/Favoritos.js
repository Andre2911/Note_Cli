import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export const Favoritos = () => {
    const db = [
        {id: 1, name: 'Proyecto Final Multiplataforma'},
        {id: 2, name: 'Laboratorio de Programación'},
        {id: 3, name: 'Aprender Piano'},
        {id: 4, name: 'Subir a Predator'},
    ]
    return(
        <ScrollView style={{backgroundColor: 'black'}}>    
        <View style={styles.container}>
            <Text style={styles.titulo}>Accesos Directos</Text>
            <Text style={styles.text_recientes}>RECIENTES</Text>
            <View style={styles.container_item}>
                {db.map(item=>{
                    return(
                        <Text style={styles.item_text} key={item.id}>•  {item.name}</Text>
                    )
                })}
            
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding:10
    },
    titulo: {
        color: '#fff',
        // fontWeight: 'bold',
        fontSize: 23,
        marginTop: 50,
    },
    text_recientes: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 15,
        borderBottomColor: 'rgba(255,255,255,0.5)',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    item_text: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 7,
    },
    container_item: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
})