import React,{Component} from 'react'
import {View, Text} from 'react-native'
import MainStyle from '../MainStyle'

class TaskDetail extends Component{
  
   state =({
     title:'',
     desc:'',
     schedule:'',
     startDate:'',
     endDate:'',
     reminder:''
   })

  componentDidMount(){
      const {taskTitle,taskDesc,taskSchedule,taskStartDate,taskEndDate,taskReminder}=this.props.route.params;
      this.setState({
          title:taskTitle,
          desc:taskDesc,
          schedule:taskSchedule,
          startDate:taskStartDate,
          endDate:taskEndDate,
          reminder:taskReminder
      }) 
  }

   render(){
    return(
        <View style={MainStyle.container}>
            <Text>Title : {this.state.title}</Text>
            <Text>Description : {this.state.desc}</Text>
            <Text>Schedule : {this.state.schedule}</Text>
            <Text>Start Date : {this.state.startDate}</Text>
            <Text>End Date : {this.state.endDate}</Text>
            <Text>Reminder : {this.state.reminder}</Text>
        </View>
    )
   }
}

export default TaskDetail
