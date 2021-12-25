import React, {useEffect, useState} from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider, useSelector,useDispatch } from 'react-redux';
import HomeScreen from './views/index'
import {Timer} from './views/Pomodoro/timer'
import {Settings} from './views/Pomodoro/settings'
import RegisterScreen from './views/Register/register1'
import Register2Screen from './views/Register/register2'
import Register3Screen from './views/Register/register3'

import store from './store'
import { login } from './actions/auth'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Stack_Home = createNativeStackNavigator();
const Stack_Register = createNativeStackNavigator();


const HomeScreens = () => {
  return (
    <Stack_Home.Navigator>
      <Stack_Home.Screen name="Home2" component={HomeScreen} options={{ headerShown: false }} />
      <Stack_Home.Screen name="Inicio" component={Timer} options={{ headerShown: false }} />
      <Stack_Home.Screen name="settings" component={Settings} options={{ headerShown: false }} />
    </Stack_Home.Navigator>
  )
}

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
  
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(true);
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@User')
      // if (value === null) return setIsAppFirstTimeOpen(true);
      setIsAppFirstTimeOpen(false);
      if(value !== null) {
        setIsAppFirstTimeOpen(false);
        return value
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() =>{

    getData()
    .then((er) => {
      if(er !== undefined) {
        dispatch(login(er))
      }
    })
  

  },[])
  if (isAppFirstTimeOpen) return <LoadingScreen />;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName ={user ? 'Home': 'Register'}>
      {
      user.isLoggedIn ?
        <Stack.Screen name="Home" component={HomeScreens} options={{headerShown: false}}/>
        :
        <Stack.Screen name="Register" component={RegisterScreens} options={{ headerShown: false }} />
}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LoadingScreen = () => {
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
      <Text style={{color: 'white', fontSize: 20}}>Loading...</Text>
    </View>
  )
}
const Tienda = () => {

  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Tienda
