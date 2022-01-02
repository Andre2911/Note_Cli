import React, { useState }  from 'react'
import { StyleSheet,StatusBar} from 'react-native';
import { title, renderNavBar } from './components/parallax_header';
import { RenderContent } from './components/parallax_body';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import background from '../../assets/background.png';
import { Categorie } from '../Category'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const HEADER_HEIGHT = 64;

const Stack = createNativeStackNavigator();


export function Home() {
  return (

      <Stack.Navigator
      screenOptions ={
        {headerShown: false}
      }>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Categorie" component={Categorie} />
      </Stack.Navigator>

  );
}
const App = (e) => {
  
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={180}
        extraScrollHeight={20}
        navbarColor="#000"
        titleStyle={styles.titleStyle}
        title={title()}
        backgroundImage={background}
        backgroundImageScale={1.2}
        renderNavBar={()=>renderNavBar(e)}
        renderContent={()=><RenderContent props={e}/>}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        alwaysShowTitle={false}
        alwaysShowNavBar={false}
        
      />
    </>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },

  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

});