import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import TaskDetail from '../components/TaskDetail';

const Stack = createStackNavigator();

const HomeScreen = () => {
    return (
            <Stack.Navigator initialRouteName='home'
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#9999ff',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
                <Stack.Screen name='Tasks' component={TaskList} options={{title:'All Tasks'}}></Stack.Screen>
                <Stack.Screen name='CreateTask' component={CreateTask} options={{title:'Add Task'}}></Stack.Screen>
                <Stack.Screen name='TaskDetail' component={TaskDetail} options={({route})=>({title:route.params.taskTitle})}></Stack.Screen>
            </Stack.Navigator>
    )
}
export default HomeScreen