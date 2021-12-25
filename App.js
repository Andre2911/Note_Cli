import React, {useEffect, useState} from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider, useSelector,useDispatch } from 'react-redux';
import RegisterScreen from './views/Register/register1'
import Register2Screen from './views/Register/register2'
import Register3Screen from './views/Register/register3'

import store from './store'

const Stack = createNativeStackNavigator();
const Stack_Home = createNativeStackNavigator();
const Stack_Register = createNativeStackNavigator();



const RegisterScreens = () => {
  return(
    <Stack_Register.Navigator initialRouteName ={'Register1'}>
      <Stack_Register.Screen name="Register1" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack_Register.Screen name="Register2" component={Register2Screen} options={{ headerShown: false }} />
      <Stack_Register.Screen name="Register3" component={Register3Screen} options={{ headerShown: false }} />
    </Stack_Register.Navigator>
  )
}
const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName ={false ? 'Home': 'Register'}>
      {
      true ?
        <Stack.Screen name="Home" component={RegisterScreens} options={{headerShown: false}}/>
        :
        <Stack.Screen name="Register" component={RegisterScreens} options={{ headerShown: false }} />
}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const Tienda = () => {

  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Tienda
