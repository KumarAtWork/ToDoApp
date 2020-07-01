import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native' 
import HomeScreen from './screens/HomeScreen';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import TaskReducer from './TaskReducer';

const Drawer =  createDrawerNavigator();
const rootReducer =  combineReducers({
  task:TaskReducer
})
const store = createStore(rootReducer);

export default function App() {
  return (
  <Provider store={store}>
    <NavigationContainer>
     <Drawer.Navigator initialRouteName='Home'>
       <Drawer.Screen component={HomeScreen} name='Home'/>
     </Drawer.Navigator>
    </NavigationContainer>
  </Provider>
  );
}