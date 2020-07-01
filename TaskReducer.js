const initialState = {
    id:'',
    title:'',
    desc:'',
    isRecurring:false,
    schedule:'',
    startDate:'',
    endDate:'',
    reminder:'',
    reminderVal:''
}

const TaskReducer = (state=initialState, action) =>{
     switch(action.type){
         case 'TASK': return {
             ...state,
             id:action.task.taskId,
             title:action.task.taskTitle,
             desc:action.task.taskDesc,
             isRecurring:action.task.taskIsRecurring,
             schedule:action.task.taskSchedule,
             startDate:action.task.taskStartDate,
             endDate:action.task.taskEndDate,
             reminder:action.task.taskReminder,
             reminderVal:action.task.taskReminderVal
              }
         default: return state
     }
}

export default TaskReducer