import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Categoria} from './Categoria/categoria'
import { Graficos } from './Graficos/graficos'
import { Hecho } from './Hecho/hecho'
// import { FontAwesome5,FontAwesome,Entypo   } from '@expo/vector-icons';

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
                // tabBarIcon: ({color, size}) => (
                //     <FontAwesome5 name="tasks" size={size+4} color={color} />
                // )
                }}>
                    {props => <Categoria {...props} extraData={e.route.params.titulo} />}
                </Tab.Screen>
        <Tab.Screen 
              name="Listado2" 
              options={{
                headerShown: false,
                tabBarLabel: 'Gráficos',
                // tabBarIcon: ({color, size}) => (
                //     <FontAwesome name="line-chart" size={size+4} color={color} />
                // )
                }}>
                    {props => <Graficos {...props} extraData={e.route.params.titulo} />}
                </Tab.Screen>
        <Tab.Screen 
        name="Listado3" 
        options={{
        headerShown: false,
        tabBarLabel: 'Hecho',
        // tabBarIcon: ({color, size}) => (
        //     <Entypo name="check" size={size+4} color={color} />
        // )
        }}>
            {props => <Hecho {...props} extraData={e.route.params.titulo} />}
        </Tab.Screen>

        </Tab.Navigator>
    )
}

