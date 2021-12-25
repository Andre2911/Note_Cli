import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text,Switch } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';

export const Settings = (e) => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [isEnabled2, setIsEnabled2] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity onPress={()=>e.navigation.goBack()} style={{justifyContent: 'center'}}>
                    {/* <AntDesign name="close" size={20} color="white" /> */}
                </TouchableOpacity>
                <Text style={styles.title}>Ajustes</Text>
                <Text style={styles.title}></Text>
            </View>
            <View style={styles.container_body}>
                <View style={styles.container_body_item}>
                    <Text style={styles.title_item}>Tiempo de Enfoque</Text>
                    <Text style={styles.title_item}>25min</Text>
                </View>
                <View style={styles.container_body_item}>
                    <Text style={styles.title_item}>Tiempo de descanso</Text>
                    <Text style={styles.title_item}>5min</Text>
                </View>
                <View style={[styles.container_body_item,{alignItems: 'center'}]}>
                    <Text style={styles.title_item}>Modo Automático</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#E0AD12" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], margin: -9 }}
                    />
                </View>
                <View style={[styles.container_body_item,{alignItems: 'center'}]}>
                    <Text style={styles.title_item}>Modo Estricto</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#E0AD12" }}
                        thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={toggleSwitch2}
                        value={isEnabled2}
                        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], margin: -9 }}
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    container_header: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
    },
    container_body: {
        marginLeft: 10,
        marginTop: 20,
        marginRight: 10,
    },
    container_body_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        color: 'white',
        fontSize: 14,
        alignSelf:'center'
    },
    title_item: {
        color: 'white',
        fontSize: 15,
    }
})