import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import TaskDetail from '../components/TaskDetail';
import ScheduleTask from '../components/ScheduleTask';
import {Button, Icon} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {APP_HEADER_COLOR} from '../ToDoConstants'

const Stack = createStackNavigator();

const HomeScreen = ({navigation, route}) => {
    return (
            <Stack.Navigator initialRouteName='home'
            screenOptions={{
                headerStyle: {
                  backgroundColor:APP_HEADER_COLOR,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              }}
            >
                <Stack.Screen name='Tasks' component={TaskList} options={{headerTitle:'All Tasks',headerLeft:()=>(
                <TouchableOpacity style={{padding:9}} onPress={()=>navigation.openDrawer()}>
                  <Icon name="menu" style={{ fontSize: 28, color: "#fff", lineHeight: 25 }}/>
                </TouchableOpacity>)}}>
                </Stack.Screen>
                <Stack.Screen name='CreateTask' component={CreateTask} options={{title:'Add Task'}}></Stack.Screen>
                <Stack.Screen name='TaskDetail' component={TaskDetail} options={{title:'Task Detail', headerRight:()=>{
                  
                }}}></Stack.Screen>
                <Stack.Screen name='ScheduleTask' component={ScheduleTask} options={{title:'Schedule task'}}></Stack.Screen>
            </Stack.Navigator>
    )
}
export default HomeScreen