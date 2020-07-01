import React, { useState} from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet, AsyncStorage, Switch } from 'react-native'
import { STORAGE_TASK_KEY } from '../ToDoConstants'
import MainStyle from '../MainStyle'

const CreateTask = (props) => {

    const [id,setId] = useState(STORAGE_TASK_KEY);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [isTaskSaved, SetIsTaskSaved] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);
    
    const addTaskHandler = async () => {
        console.log('Adding Task');
        console.log('Title:' + title + 'Desc:' + desc + 'isRecurring :'+ isRecurring);
        const task = {
            taskId:id,
            taskTitle: title,
            taskDesc: desc,
            taskIsRecurring: isRecurring
        }
        try {
            AsyncStorage.setItem(id, JSON.stringify(task)).then(success => {
                alert('Task successfully saved for id:'+id);
                SetIsTaskSaved(true)
            }
            )
        } catch (e) {
            alert('Failed to save task' + e)
        }
    }

    return (<View style={MainStyle.toDoContainer}>
        <View style={{ ...MainStyle.taskElement, ...styles.taskInput }} >
            <TextInput value={title} autoFocus={true} onChangeText={text => setTitle(text)} style={{height:35}} maxLength={100} placeholder='Title' />
        </View>
        <View style={{ ...MainStyle.taskElement, ...styles.taskInput }} >
            <TextInput value={desc} onChangeText={text => setDesc(text)} style={{textAlignVertical: "top" }} multiline={true} numberOfLines={5} maxLength={300} placeholder='Description' />
        </View>
        <View style={{ ...MainStyle.taskElement, ...styles.switchTaskType }}>
            <Text style={{ ...MainStyle.toDoLabelFont, flex: 1 }}>Recurring Task :</Text>
            <Switch
                value={isRecurring}
                onValueChange={v => {
                    setIsRecurring(v);
                }}
            />
        </View>
        {!isTaskSaved && <View style={MainStyle.taskElement}>
            <TouchableHighlight style={{ ...MainStyle.btnFull, ...MainStyle.btnActive }} onPress={addTaskHandler}>
                <Text style={{ ...MainStyle.buttontText, fontWeight: "bold", fontSize: 18 }}> Add Task </Text>
            </TouchableHighlight></View>
        }
        {isTaskSaved && <View style={MainStyle.taskElement}>
            <TouchableHighlight style={{ ...MainStyle.btnFull, ...MainStyle.btnActive }} onPress={() => props.navigation.navigate('ScheduleTask', {id, title, desc, isRecurring })}>
                <Text style={{ ...MainStyle.buttontText, fontWeight: "bold", fontSize: 18 }}> Schedule Task </Text>
            </TouchableHighlight></View>
        }

    </View>

    )
}

const styles = StyleSheet.create({
    taskInput: {
        borderColor: 'gray',
        borderWidth: 0.3
    },
    switchTaskType: {
        flexDirection: 'row',
        marginTop: 20,
    },

})

export default CreateTask