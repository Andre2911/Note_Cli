import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Categoria} from './Categoria/categoria'
import { Graficos } from './Graficos/graficos'
import { Hecho } from './Hecho/hecho'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'


const Tab = createBottomTabNavigator();

export const Categorie = (e) => {

    return(
        <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'rgba(0,0,0,0.6)',
          tabBarActiveBackgroundColor: '#E0AD12',
          tabBarInactiveBackgroundColor: '#E0AD12',
          tabBarStyle: { height: 55 }
        }}>
          <Tab.Screen 
              name="Listado" 
              options={{
                headerShown: false,
                tabBarLabel: 'Tareas',
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="home" size={size+4} color={color} />
                )
                }}>
                    {props => <Categoria {...props} extraData={e.route.params.titulo} />}
                </Tab.Screen>
        <Tab.Screen 
              name="Listado2" 
              options={{
                headerShown: false,
                tabBarLabel: 'Gráficos',
                tabBarIcon: ({color, size}) => (
                    <AntDesign name="linechart" size={size+4} color={color} />
                )
                }}>
                    {props => <Graficos {...props} extraData={e.route.params.titulo} />}
                </Tab.Screen>
        <Tab.Screen 
        name="Listado3" 
        options={{
        headerShown: false,
        tabBarLabel: 'Hecho',
        tabBarIcon: ({color, size}) => (
            <MaterialIcons name="done" size={size} color={color} />
        )
        }}>
            {props => <Hecho {...props} extraData={e.route.params.titulo} />}
        </Tab.Screen>

        </Tab.Navigator>
    )
}

