import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, View, Text } from 'react-native'
import { List, ListItem, Left, Right, Icon, Content} from 'native-base';
import AddButton from './AddButton'
import MainStyle from '../MainStyle'

class TaskList extends Component {

    state = {
        taskList: [],
    }

    componentDidMount() {
        this.retrieveTaskList().then(res => this.setState({
            taskList: res
        })
        ).catch(err => console.error('error on fetching list' + err));
    }

    retrieveTaskList = async () => {
        const keys = await AsyncStorage.getAllKeys();
        console.log('result:' + keys);
        return await this.resultList(keys);
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

    render() {
        return (
           <>
           <View style={MainStyle.container}>
            <Content>
                <List>
                    {this.state.taskList !== '' && this.state.taskList.map(task =>
                        <ListItem style={{paddingTop:10}} onPress={()=>this.props.navigation.navigate('TaskDetail',{...task})}>
                            <Left>
                                <Text>{task.taskTitle}</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    )}
                </List>
            </Content>
            </View>
            <AddButton handler={()=>this.props.navigation.navigate('CreateTask')}/>
            </>
        )
    }

}


const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F194FF",
    }
})

export default TaskList