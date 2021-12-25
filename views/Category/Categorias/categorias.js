import React from 'react'
import { View, StyleSheet, Text,TouchableOpacity,ScrollView, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export const Categorias = (e) => {

    const HandlePress = (id) => {
        e.navigation.navigate('Categorie', {titulo: id.name})
    }

    const HandlePressAdd = () => {
        console.log("siu")
    }
    const db = [
        { id: 1, name: "General", posterUrl: '#7DC8E7' },
        { id: 2, name: "Estudios", posterUrl: '#FD7694' },
        { id: 3, name: "Salud", posterUrl: '#262626' },
        { id: 4, name: "Diversión", posterUrl: '#80d676' },
      ]

    return(
        <ScrollView
            style={styles.container0}
            contentContainerStyle={styles.container}>
            {/* <ScrollView> */}
            {db.map(item => {
                return(
                <TouchableOpacity 
                    key={item.id}
                    activeOpacity={1} 
                    style={styles.container_category}
                    onPress={()=>HandlePress(item)}>
                    <LinearGradient

                    colors={[item.posterUrl, 'rgba(0,0,0,0.7)']}

                    end={{ x:1, y: 0.8 }}
                    style={[styles.container_category,{width: '100%'}]}>
                    <Text style={styles.text}>{item.name}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                
            )})}
            <TouchableOpacity 
                    activeOpacity={1} 
                    style={[styles.container_category, {borderWidth: 1, borderColor: '#fff'}]}
                    onPress={()=>HandlePressAdd()}>
                    <Text style={styles.text_add}>+</Text>
            </TouchableOpacity>

        </ScrollView>
     

    )
}

const styles = StyleSheet.create({
    container0: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15,
        // borderColor: '#fff',
        // borderWidth: 1,
    },
    container_category:{
        width: '45%',
        height: 200,
        backgroundColor: 'transparent',
        margin: '2.5%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#fff',          
    },
    text: {
        color: '#fff',
        fontSize: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 10,
        alignSelf: "center",
        // marginBottom: 20,
    },
    text_add: {
        color: '#fff',
        fontSize: 100,
        fontWeight: 'normal',
    },
    button: {

    }
})