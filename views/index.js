import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './Home/components/DrawerContent';
import { Home } from './Home/Home'
import { Categorias } from './Category/Categorias/categorias'
import { Graficos } from './Category/Graficos/graficos';
import { Favoritos } from './Favoritos/Favoritos.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Drawer = createDrawerNavigator();


function HomeScreen(e) {

    return (
    <Drawer.Navigator  
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#E0AD12',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {marginLeft: -20, color: 'white', fontSize: 15} }}
        >
      <Drawer.Screen 
          name="Página de Inicio"
          component={Home} 
          options={{ 
              drawerIcon:({color})=>(
                <MaterialIcons name="home" size={24} color={color} />
              )}}
              />
              
      <Drawer.Screen 
          name="Favoritos" 
          component={Favoritos} 
          options={{ 
              drawerIcon:({color})=>(
                <MaterialIcons name="star" size={24} color={color} />
          )}}
          />
      <Drawer.Screen 
          name="Categorias" 
          component={Categorias} 
          options={{ 
              drawerIcon:({color})=>(
                <MaterialIcons name="inbox" size={24} color={color} />
          )}}
          />
      <Drawer.Screen 
          name="Gráficas" 
          component={Graficos} 
          options={{ 
              drawerIcon:({color})=>(
                <AntDesign name="linechart" size={24} color={color} />
          )}}
          />
    </Drawer.Navigator>
    
    );
  }

export default HomeScreen;