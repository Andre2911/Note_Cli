import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { DrawerContent } from './Home/components/DrawerContent';
// import { Home } from './Home/Home'
// import { Categorias } from './Category/Categorias/categorias'
// import { Graficos } from './Category/Graficos/graficos';
// import { Favoritos } from './Favoritos/Favoritos.js'
// import { Entypo, AntDesign } from '@expo/vector-icons';
// import 'react-native-gesture-handler';
import {View, Text} from 'react-native';

// const Drawer = createDrawerNavigator();

const test = () => {
  return(
    <View>
      <Text style={{color: 'black'}}>Hola</Text>
    </View>
  )
}
// function HomeScreen(e) {

//     return (
//     <Drawer.Navigator  
//       drawerContent={props => <DrawerContent {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerActiveTintColor: '#E0AD12',
//         drawerInactiveTintColor: '#fff',
//         drawerLabelStyle: {marginLeft: -20, color: 'white', fontSize: 15} }}
//         >
//       <Drawer.Screen 
//           name="Página de Inicio"
//           // component={Home} 
//           component= {test}
//           // options={{ 
//           //   // headerShown: false,
//           //     drawerIcon:({color})=>(
//           //       <Entypo name="home" size={24} color={color} />
//           //     )}}
//               />
              
//       {/* <Drawer.Screen 
//           name="Favoritos" 
//           component={Favoritos} 
//           // options={{ 
//           //     drawerIcon:({color})=>(
//           //       <AntDesign name="star" size={24} color={color} />
//           // )}}
//           />
//       <Drawer.Screen 
//           name="Categorias" 
//           component={Categorias} 
//           // options={{ 
//           //     drawerIcon:({color})=>(
//           //       <AntDesign name="inbox" size={24} color={color} />
//           // )}}
//           />
//       <Drawer.Screen 
//           name="Gráficas" 
//           component={Graficos} 
//           // options={{ 
//           //     drawerIcon:({color})=>(
//           //       <AntDesign name="linechart" size={24} color={color} />
//           // )}}
//           /> */}
//     </Drawer.Navigator>
    
//     );
  // }

export default test;