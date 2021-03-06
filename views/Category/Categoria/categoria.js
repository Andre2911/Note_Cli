import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TextInput,FlatList, Modal, Alert, Pressable, StatusBar} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewCategory from '../Categorias/NewCategory'
import {retrieveTareas }from '../../../actions/tareas'; 

const Task = (e,item) => {
    // console.log(item,"item")
    // console.log({id: item.id,extraData: item.name, status: item.status, categoria: e.extraData},"itemsxdxd")
    return(
        <TouchableOpacity activeOpacity={1} key={item} onPress={()=>e.navigation.navigate('Inicio',{id: item.id,extraData: item.name, status: item.status, categoria: e.extraData})}>
            <Text style={styles.item}>• {item.name}</Text>
        </TouchableOpacity>
    )
}

export const Categoria = (e) => {

    const [number, onChangeNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState([])
    const [ tareas, setTareas ] = useState([])

    const dispatch = useDispatch()
    const retrieveTareas2 = async (categoria) => {
        const result = await AsyncStorage.getItem(`categoria-${categoria}`);
        const parseResult= result === null ? [] : JSON.parse(result)
        // console.log(parseResult,"parseResult")
        setTareas(parseResult)
    }
    const tareasxd = useSelector(state => state.tareas)
    console.log(tareasxd)

    useEffect(() => {
        dispatch(retrieveTareas(e.extraData))
        retrieveTareas2(e.extraData)
        .then(() =>
            filterList(tareas)
        )
        
    },[number, dispatch])

    

    const filterList = (tarea) => {
        const data = tarea.filter(
                    (listItem) =>              
                        listItem.name
                        .toLowerCase()
                        .includes(number.toLowerCase())
                    )
        setSearch(data)
      }

    const CloseModal = (data) => {
        console.log(data,"data")
        tareas.push({id: data.id, name: data.name, status: false, time: 0, mode: "Pomodoro"})
        tareasxd.push({id: data.id, name: data.name, status: false, time: 0, mode: "Pomodoro"})
        setModalVisible(!modalVisible)
      }
    const longitud = number == "" ? tareasxd.length : search.length
    if(tareas.lenght===0){
        retrieveTareas2(e.extraData)
    }
    // console.log(tareas)
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <NewCategory 
                    close={CloseModal}
                    actividad={"Tarea"}
                    categoria={e.extraData}/>
            </Modal>

            <Text style={styles.text}>{e.extraData}</Text>
            <View style={styles.container_search}>
                <MaterialIcons name="search" size={28} color="#7a7a7a" style={styles.icon_search} />
                <TextInput 
                    style={styles.text_input} 
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Buscar Notas"
                    placeholderTextColor="#7a7a7a" />
            </View>
            <Text style={styles.number_tareas}>{longitud} Tareas</Text>
            <View style={styles.container_tareas}>
                { tareas.length !== 0 ? 
                    <FlatList
                    data={number ==="" ? tareasxd : search}
                    renderItem={({item}) => Task(e,item)}
                    keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    <Text style={styles.text_empty}>No hay tareas</Text>
                }
            </View>
            <TouchableOpacity style={styles.container_add} onPress={()=>setModalVisible(!modalVisible)}>
                <MaterialIcons name="add-circle" size={58} color="#E0AD12" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingLeft: 20
    },
    text: {
        color: '#fff',
        fontSize: 25,
        marginTop: 20,
        marginLeft: 0,
        fontWeight: 'bold'
    },
    text_input: {
        padding: 10,
        color: '#fff',
        // borderColor: '#fff',
        // borderWidth: 1,
        paddingRight: 150
    },
    icon_search:{
        padding: 10
    },
    number_tareas:{
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 15,

    },
    container_search:{
        backgroundColor: '#333',
        width: Dimensions.get('window').width/1.1,
        borderRadius: 40,
        flexDirection: 'row',
        margin: 20,
        marginLeft: 0,
    },
    container_tareas: {
        marginTop: 12,
        flex: 1,
       },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: '#fff',
    },
    container_add: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    text_empty: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18,
        opacity: 0.2
    }
})