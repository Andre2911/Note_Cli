import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions,ScrollView } from 'react-native'

export const Graficos = (e) => {

    const db = [
        {key: 1, name: 'Laboratorio 11', time: "1 h 30 min", color: '#00BFFF'},
        {key: 2,name: 'Laboratorio 12', time: "1 h 48 min", color: '#f00'},
        {key: 3,name: 'Laboratorio 10', time: "1 h 14 min", color: '#b3b2a4'}
    ]
    return(
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>Vive el momento Presente</Text>
            <View style={styles.container_grafico}>
                <View style={styles.container_grafico_1}>
                    <Text style={styles.text_time}>2 h  32 min</Text>
                    <Text style={styles.text_time_rest}>3 h 50 min menos que ayer</Text>
                    <View style={styles.container_chart}>

                    </View>
                {db.map(item =>{
                    return(
                    <View style={styles.container_tarea} key={item.KEY}> 
                        <Text style={styles.text_tarea}>•  {item.name} </Text>
                        <View style={styles.text_tarea_point}>
                            <View style={[styles.category__point, {backgroundColor: item.color}]}></View>
                            <Text style={styles.text_time_point}>{item.time}</Text>
                        </View>
                    </View>
                    )
                })}
                    

                    
                </View>
                
            </View>
            <Text style={styles.text_objetivos}>Sus Objetivos</Text>
            <View style={styles.container_objetivos}>
                <View style={styles.container_objetivos_1}>
                    <Text style={styles.text_objetivos_1}>5 Horas</Text>
                </View>
                <View style={styles.container_objetivos_1}>
                <Text style={styles.text_objetivos_1}>React Native</Text>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
    backgroundColor: '#000',
    flex: 1,
    },
    text: {
        color: '#fff',
        fontSize:35,
        marginLeft:20,
        marginTop:20,
    },
    text_objetivos: {
        color: '#fff',
        fontSize:22,
        marginLeft:20,
        marginTop:20,
        marginBottom:20,
    },
    container_grafico:{
        width: Dimensions.get('window').width,
        backgroundColor: '#191919',
        marginTop:40,
        borderRadius: 30,
    },
    container_objetivos:{
        display: 'flex',
        flexDirection: 'row',
    },
    container_objetivos_1:{
        width: Dimensions.get('window').width/2.05,
        flexWrap: 'wrap',
        backgroundColor: '#191919',
        height: Dimensions.get('window').width/2,
        marginRight: 15,
        borderRadius: 30,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_time:{
        color: '#fff',
        fontSize:30,
        fontWeight: 'bold'
    },
    container_grafico_1:{
        marginTop: 25,
        marginLeft: 25,
        marginRight: 20,
        marginBottom: 10,
    },
    text_time_rest:{
        color: '#fff',
    },
    container_chart:{
        marginTop: 20,
        marginBottom: 15,
        width: Dimensions.get('window').width - 50,
        height: 35,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    container_tarea:{
        marginTop: 10,
        width: Dimensions.get('window').width - 50,
        flexDirection: 'row',
    },
    text_tarea:{
        color: '#fff',
        fontSize:20,
        marginBottom: 10,
        width: '80%',
    },
    text_tarea_point:{
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    text_time_point:{
        color: '#fff',
    },
    category__point:{
        width: 30,
        backgroundColor: '#fff',
        height: 10,
        borderRadius: 50,
        alignItems: 'center',
    },
    text_objetivos_1:{
        color: '#fff',
        fontSize:20,
        flexWrap: 'wrap',
        textAlign: 'center',
        marginLeft: 100
    }
})