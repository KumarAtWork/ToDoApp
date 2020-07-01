import React, { useState, useEffect } from 'react'
import { AsyncStorage, StyleSheet, View, Text } from 'react-native'
import { List, ListItem, Left, Right, Icon } from 'native-base';
import AddButton from './AddButton'
import MainStyle from '../MainStyle'
import {useDispatch} from 'react-redux'

const TaskList = (props) =>{

    const [taskList,setTaskList] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        retrieveTaskList().then(res =>setTaskList(res)).catch(err => console.error('error on fetching list' + err));
    }, [])

    retrieveTaskList = async () => {
        const keys = await AsyncStorage.getAllKeys();
        console.log('result:' + keys);
        return await resultList(keys);
    }

    resultList = async (keys) => {
        const ls = keys.map(async key => {
            const rs = await AsyncStorage.getItem(key)
            console.log('rs' + rs);
            return JSON.parse(rs);
        });
        const lst = await Promise.all(ls);
        return lst;
    }

    return(<View  style={{...MainStyle.toDoBackGround,flex:1}}>
           <View style={MainStyle.toDoContainer}>
                <List style={MainStyle.toDoViewColor}>
                    {taskList !== '' && taskList.map(task =>
                        <ListItem key={task.taskId} onPress={()=>{
                            console.log('task:'+JSON.stringify(task));
                            dispatch({type:'TASK',task:task}); 
                            return props.navigation.navigate('TaskDetail');
                           }
                            }>
                            <Left>
                                <Text>{task.taskTitle}</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    )}
                </List>
            </View>
            <AddButton handler={()=>props.navigation.navigate('CreateTask')}/>
            </View>
     )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F194FF",
    }
})

export default TaskList