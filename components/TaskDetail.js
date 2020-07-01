import React, { Component} from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import MainStyle from '../MainStyle'
import { H1, H2, Left, Right, Icon } from 'native-base'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import {connect} from 'react-redux'

class TaskDetail extends Component {

    state = ({
        taskId: '',
        taskTitle: '',
        taskDesc: '',
        taskIsRecurring:false,
        taskSchedule: '',
        taskStartDate: '',
        taskEndDate: '',
        taskReminder: '',
    })

    componentDidMount(){
        console.log('componentDidMount called--');
        this.updateState();
    }

    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate called--');
        if(prevProps.tsk.reminder!==this.props.tsk.reminder ||
           prevProps.tsk.schedule!==this.props.tsk.schedule ||
           prevProps.tsk.startDate!==this.props.tsk.startDate ||
           prevProps.tsk.endDate!==this.props.tsk.endDate)
        this.updateState();
    }
     
    updateState = () =>{
        const { id, title, desc, isRecurring, schedule, startDate, endDate, reminder } = this.props.tsk;
        this.setState({
            taskId:id,
            taskTitle:title,
            taskDesc:desc,
            taskIsRecurring:isRecurring,
            taskSchedule:schedule,
            taskStartDate:startDate,
            taskEndDate:endDate,
            taskReminder:reminder
        })
    }
    

     loadTaskDetailState = () =>{
        const task={};
        task.taskId=this.state.taskId,
        task.taskTitle=this.state.taskTitle,
        task.taskDesc=this.state.taskDesc,
        task.taskIsRecurring=this.state.taskIsRecurring
        task.taskSchedule=this.state.taskSchedule,
        task.taskStartDate=this.state.taskStartDate,
        task.taskEndDate=this.state.taskEndDate,
        task.taskReminder=this.state.taskReminder
        // calling dispatch
        this.props.setTask(task);
     }

    render() {
        return (<ScrollView style={MainStyle.toDoBackGround}>
            <View style={MainStyle.toDoContainer}>
                <View style={MainStyle.toDoTextView} accessible={true} onMagicTap={()=>alert('tapped')}>
                    <Text style={styles.taskLabel}>Title</Text>
                    <Text>{this.state.taskTitle}</Text>
                </View>
                <View style={MainStyle.toDoTextView}>
                    <Text style={styles.taskLabel}>Detail</Text>
                    <Text>{this.state.taskDesc}</Text>
                </View>
                <View style={{...MainStyle.toDoTextView,flexDirection:"row"}}>
                    <Left>
                    <Text>Repeat</Text>
                    </Left>
                    <Right>
                    <Switch
                        value={this.state.taskIsRecurring}
                        onValueChange={v => {
                            this.setState({taskIsRecurring:v});
                        }} />
                    </Right>
                </View>
                <View style={MainStyle.toDoTextView}>
                    <Text style={styles.taskLabel}>Created</Text>
                    <Text>{new Date(Date.parse(this.state.taskId)).toLocaleString()}</Text>
                </View>
                {this.state.taskIsRecurring &&
                    <View style={MainStyle.toDoTextView}>
                        <Text style={styles.taskLabel}>Schedule</Text>
                       <Text>{this.state.taskSchedule}</Text>
                    </View>}
                    
                    <View style={MainStyle.toDoTextView}>
                        <Text style={styles.taskLabel}>Start Date</Text>
                        <Text>{new Date(Date.parse(this.state.taskStartDate)).toLocaleString()}</Text>
                    </View>
                    { this.state.taskIsRecurring &&
                    <View style={MainStyle.toDoTextView}>
                        <Text style={styles.taskLabel}>End Date</Text>
                        <Text>{new Date(Date.parse(this.state.taskEndDate)).toLocaleString()}</Text>
                    </View>
                    }
                    <View style={MainStyle.toDoTextView}>
                        <Text style={styles.taskLabel}>Reminder</Text>
                        <Text>{new Date(Date.parse(this.state.taskReminder)).toLocaleString()}</Text>
                    </View>
                    <View>
                    <TouchableOpacity style={MainStyle.btnFull} onPress={()=>{
                        this.loadTaskDetailState();
                        this.props.navigation.navigate('ScheduleTask')}
                    }>
                         {this.state.schedule=='' || this.state.schedule == undefined ?<Text>Schedule Task</Text>:<Text>Reschedule Task</Text>}
                     </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity style={MainStyle.btnFull}>
                         <Icon name="trash"></Icon>
                     </TouchableOpacity>
                    </View>
                    
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    taskLabel:{
        fontSize:8
    }
})


const mapDispatchToProps = dispatch =>{
    return {
        setTask:(tsk)=>dispatch({type:'TASK',task:tsk}),
    }
}

const mapStateToProps = state =>{
    return {
        tsk:state.task
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)
