import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions,ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveTiempo_categoria } from "../../../actions/time_history"

export const Graficos = (e) => {

    var key = ""
    const f = new Date()
    const dia = new Date(f.getFullYear(), f.getMonth(), f.getDate())
    const data = useSelector(store => store.tiempo)
    var tiempo_total = 0
    let DA
    try{
        DA = data.find((a)=> {
            key = Object.keys(a)[0]
            return new Date(Object.keys(a)[0]).getTime() === new Date(dia.getFullYear(), dia.getMonth(), dia.getDate()).getTime()
        })[`${key}`].sort((x, y) => {
            if (x.tiempo < y.tiempo) {return 1;}
              if (x.tiempo > y.tiempo) {return -1;}
              return 0;
          }); // Array con actividades que se hicieron hoy ordenado de mayor a menos por tiempo
        //   DA.map((a,id)=>{
        //       a.push()
        //   })
        console.log(DA, "tiempo") 
        tiempo_total= DA.reduce((a, b) => a + (b["tiempo"] || 0), 0) // hallo el tiempo total del array
    }catch{
        DA = []
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(retrieveTiempo_categoria(e.extraData))
    },[dispatch])

    const secondsToString = (seconds)=> {
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        if (hour == 0) return minute + " min"
        else return hour + ' h ' + minute + "min"
      }
    
    const colors= ["#69d8c2",
      "#415b98",
      "#c782ff"
      ]
    const frases_inspiradoras = [
        "Vive el momento presente",
        "Estudia o no comerás",
        "Machu Picchu no se construyó en un día"]
    var rand = Math.floor(Math.random()*frases_inspiradoras.length);
    var rValue = frases_inspiradoras[rand];
    return(
        <ScrollView style={styles.container}>
        {/* <View style={styles.container}> */}
            <Text style={styles.text}>{rValue}</Text>
            <View style={styles.container_grafico}>
                <View style={styles.container_grafico_1}>
                    
                    <Text style={styles.text_time}>{secondsToString(tiempo_total)}</Text>
                    <Text style={styles.text_time_rest}>3 h 50 min menos que ayer</Text>
                    <View style={styles.container_chart}>
                        {DA.slice(0,3).map((xd, id)=>{
                            xd["color"] = colors[id]
                            return xd
                        }).map((i,ias)=>{
                            let ti = Math.round(i.tiempo*100/tiempo_total)
                            return(
                                <>
                                <View key={ias} style = 
                                {{width: `${ti}%`,
                                // borderWidth:1, 
                                // borderColor: '#fff', 
                                zIndex: -1,
                                backgroundColor: i.color
                                }}></View>
                                </>
                            )
                        })}
                    </View>

                {DA.slice(0,3).map((xd, id)=>{
                            xd["color"] = colors[id]
                            return xd
                        }).map((item,as) =>{
                    console.log(item, "items de la lista")
                    return(
                    <View style={styles.container_tarea} key={as}> 
                        <Text style={styles.text_tarea}>•  {item.nombre} </Text>
                        <View style={styles.text_tarea_point}>
                            <View style={[styles.category__point, {backgroundColor: item.color}]}></View>
                            <Text style={styles.text_time_point}>{secondsToString(item.tiempo)}</Text>
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
        {/* </View> */}
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
        marginRight:20,
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
        flexDirection: 'row',
        flexWrap: 'nowrap',
        zIndex: 1
    },
    container_tarea:{
        marginTop: 10,
        width: Dimensions.get('window').width - 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text_tarea:{
        color: '#fff',
        fontSize:20,
        marginBottom: 10,
    },
    text_tarea_point:{
        flexDirection: 'column',
        alignItems: 'flex-end',
        right: 10
    },
    text_time_point:{
        color: '#fff',
    },
    category__point:{
        width: 20,
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
    },
    // color_chart:{
    //     width : `${}`
    // }
})