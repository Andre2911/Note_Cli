import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput,FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieve_tareas_completadas } from '../../../actions/tareas_completadas';

const Task = (item) => {
    return(
        <View style={styles.container_task_check}>
            <Text style={styles.item}>• {item.name}</Text>
            <Text style={styles.item_time}>{item.tiempo}</Text>
        </View>
        
    )
}

export const Hecho = (e) => {
    const [number, onChangeNumber] = React.useState(null);

    const dispatch = useDispatch();

    const tareas = useSelector(state => state.tareas_completadas);
    console.log(tareas, "tareas hechas papu")
    useEffect(() => {
        dispatch(retrieve_tareas_completadas(e.extraData))
    },[dispatch])

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Realizado - {e.extraData}</Text>
            <View style={styles.container_search}>
                {/* <FontAwesome name="search" size={24} color="#7a7a7a" style={styles.icon_search} /> */}
                <TextInput 
                    style={styles.text_input} 
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Buscar Tareas Realizadas"
                    placeholderTextColor="#7a7a7a" />
            </View>
            <Text style={styles.number_tareas}>5 Tareas Hechas</Text>
            <View style={styles.container_tareas}>
                <FlatList
                    data={tareas}
                    renderItem={({item}) => Task(item)}
                />
            </View>
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
        // borderColor: '#b2b2b2',
        // borderWidth: 1,
        marginTop: 12,
        flex: 1,
        // paddingTop: 22
       },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: '#b2b2b2',
        textDecorationLine: 'line-through',
        width: '70%'
    },
    item_time: {
        paddingTop: 10,
        fontSize: 18,
        height: 44,
        color: '#b2b2b2',
        textAlign: 'right',
        borderColor: '#b2b2b2',
        // borderWidth: 1,
        width: '28%'
        
    },
    container_task_check: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    }
})