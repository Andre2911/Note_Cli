import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,SafeAreaView,ScrollView,Alert, Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import NewCategory from '../../Category/Categorias/NewCategory'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveCategorias } from '../../../actions/categorias';

const ITEM_WIDTH = Dimensions.get("window").width/2.4
const ITEM_HEIGHT = 200

// console.log(AsyncStorage.getItem('categoria'),"guardado")


const tareas = [
    { title: "Tarea 1", posterUrl: '#7DC8E7', categoria: 'General' },
    { title: "Tarea 2", posterUrl: '#FD7694', categoria: 'Estudios' },
    { title: "Tarea 3", posterUrl: '#262626', categoria: 'Salud'},
    { title: "Tarea 4", posterUrl: '#7DC8E7', categoria: 'Diversión' },
]
export const RenderContent = (props) => {
    const [ modalVisible, setModalVisible ] = useState(false);


    const dispatch = useDispatch();
    const categorias = useSelector(store => store.categorias) === null ? [{name: "Crear", color: "#7DC8E7"}] : useSelector(store => store.categorias)
    // console.log(categorias, "useselectorxd")

    useEffect(() => {
        dispatch(retrieveCategorias())
    },[dispatch])

    const handleClick = (e) => {
        props.props.navigation.navigate('Categorie',{titulo: e})
    }
    const goCategorias = () => {
        props.props.navigation.navigate('Categorias')
    }
    const HandlePressTarea = (item) => {
        props.props.navigation.navigate('Inicio',{extraData: item.title})
    }
    const CloseModal = () => {
      dispatch(retrieveCategorias())
      setModalVisible(!modalVisible)
    }

    return (
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
          actividad = {"Categoría"}/>
      </Modal>

        <View style={styles.container_categories_header}>
            <TouchableOpacity style={styles.container_title} onPress={()=>goCategorias()}>
                <Text style={styles.text}>CATEGORIAS  </Text>
                <AntDesign name="right" size={16} color="#E0AD12" style={{marginTop: 2}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.container_icon} onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons name="note-add" size={20} color="#fff" />
            </TouchableOpacity>
            
        </View>
        <SafeAreaView style={styles.container_categories_body}>
            <ScrollView
                horizontal={true}
                decelerationRate={"normal"}
                snapToInterval={ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 20, paddingHorizontal: 15, marginBottom: 20 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}
            >
                {categorias.filter(n=>n).map((item, idx) => {
                return (
                  
                    <TouchableOpacity style={styles.box} onPress={()=>handleClick(item.name)} key={idx}>
                      <LinearGradient

                    colors={[item.color, 'rgba(0,0,0,0.7)']}

                    end={{ x:1, y: 0.8 }}
                    style={styles.imagen}>
                    <View style={[styles.imagen,{backgroundColor: 'transparent'}]} resizeMode={'cover'} blurRadius={0}>
                        <Text style={styles.text2}>{item.name}</Text>
                        </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    
                )
                })}
            </ScrollView>
        </SafeAreaView>
        
        <View style={styles.container_categories_header}>
            <TouchableOpacity style={styles.container_title}>
                <Text style={styles.text}>TAREAS PENDIENTES  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container_icon}>
            <MaterialIcons name="more-vert" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container_categories_body}>
            <ScrollView
                horizontal={false}
                decelerationRate={"normal"}
                snapToInterval={ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 20, paddingHorizontal: 15, marginBottom: 20 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}
            >
                {tareas.map((item, idx) => {
                return (
                    <TouchableOpacity style={styles.box_tareas} key={idx} onPress={()=>HandlePressTarea(item)}>
                    <View style={[styles.tareas,{borderLeftColor: item.posterUrl}]}>
                        <View style={{flexDirection: 'row',display: 'flex',marginTop: 10}}>
                            <Text style={styles.text3}>{item.title}</Text>
                            {/* <TouchableOpacity style={{float: 'right', borderWidth: 2, borderColor: '#fff',marginLeft: 'auto'}} >
                                <Feather name="more-vertical" size={20} color="#fff" />
                            </TouchableOpacity> */}
                        </View>
                            <Text style={styles.text3_category}>{item.categoria}</Text>


                        
                        </View>
                    </TouchableOpacity>
                )
                })}
            </ScrollView>
        </SafeAreaView>

      </View>
    );
  };

  const styles = StyleSheet.create({

    container: {
      display: 'flex',
      backgroundColor: '#000',
      flex:1,
    },
    text: {
        color: '#fff',
        fontSize: 15,
    },
    text2: {
        color: '#fff',
        fontSize: 17,
        // marginVertical: 40,
        fontWeight: 'bold',
        borderColor: '#000',
        // borderWidth: 2,
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingHorizontal:8,
        borderRadius: 30,
        paddingVertical:5
      },
      text3: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        paddingHorizontal:8,
        borderRadius: 30,
        paddingVertical:5,
        marginLeft: 25,
      },
    text3_category: {
        color: '#7d7d7d',
        fontSize: 14,
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingHorizontal:8,
        borderRadius: 8,
        paddingVertical:5,
        marginLeft: 25,
      },
    container_categories_header: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15,
        marginRight: 20,
    },
    container_title: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%'
    },
    container_icon: {
        width: '50%',
        alignItems: 'flex-end',
    },
    imagen:{
        width: "100%",
        height: "100%",
        borderRadius: 30,
        overflow: "hidden",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.9)"
      },
      tareas:{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        justifyContent:"flex-start",
        alignItems: "baseline",
        borderRadius:20, 
        backgroundColor: "rgba(51,51,51,1)", 
        flexDirection: "column",
        display: "flex",
        borderLeftWidth: 2,
      },
    tareas_button:{
        // borderColor: '#fff',
        // borderWidth: 2,
        // width: "58%",
        marginLeft: 25,
        marginTop: 11,
        justifyContent: 'flex-start',
        borderColor: '#fff',
        borderWidth: 2,
        display: "flex",
        // flexDirection: "column",
    },
      box:{
        borderRadius: 30,
        marginRight: 10,
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent:"flex-end",
      },
      box_tareas:{
        borderRadius: 20,
        marginBottom: 15,
        height: ITEM_HEIGHT/2.3,
        width: ITEM_WIDTH*2.4-30,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      container_categories_body: {
        // flex: 1, 
        backgroundColor: "black",
        // borderColor:'white',
        // borderWidth: 1,
      },
     
  });