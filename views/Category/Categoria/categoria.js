import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TextInput,FlatList, Modal, Alert, Pressable} from 'react-native';
// import { FontAwesome,Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewCategory from '../Categorias/NewCategory'

const Task = (e,item) => {
    return(
        <TouchableOpacity activeOpacity={1} key={item} onPress={()=>e.navigation.navigate('Inicio',{extraData: item.name})}>
            <Text style={styles.item}>• {item.name}</Text>
        </TouchableOpacity>
    )
}

export const Categoria = (e) => {

    const [number, onChangeNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState([])
    const [ tareas, setTareas ] = useState([])

    const retrieveTareas = async (categoria) => {
        const result = await AsyncStorage.getItem(`categoria-${categoria}`);
        const parseResult= result === null ? [] : JSON.parse(result)
        // console.log(parseResult,"parseResult")
        setTareas(parseResult)
    }

    useEffect(() => {
        retrieveTareas(e.extraData)
        .then(() =>
            filterList(tareas)
        )
        
    },[number])

    

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
        tareas.push({name: data})
        setModalVisible(!modalVisible)
      }
    const longitud = number == "" ? tareas.length : search.length
    if(tareas.lenght===0){
        retrieveTareas(e.extraData)
    }
    return(
        <View style={styles.container}>
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
                {/* <FontAwesome name="search" size={24} color="#7a7a7a" style={styles.icon_search} /> */}
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
                    data={number ==="" ? tareas : search}
                    renderItem={({item}) => Task(e,item)}
                    keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    <Text style={styles.text_empty}>No hay tareas</Text>
                }
            </View>
            <TouchableOpacity style={styles.container_add} onPress={()=>setModalVisible(!modalVisible)}>
                {/* <Ionicons name="add-circle-sharp" size={58} color="#E0AD12" /> */}
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