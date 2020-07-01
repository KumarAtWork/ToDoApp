import React,{useState, useEffect} from 'react'
import { AsyncStorage, View,  Vibration, Modal, ScrollView, Text, Image, TextInput, Platform, StyleSheet, Switch, TouchableHighlight, TouchableOpacity, Button } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import calendarIcon from '../assets/calendar.png'
import { Picker,Left,Right } from 'native-base'
import * as TODO_CONST from '../ToDoConstants'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import MainStyle from '../MainStyle'
import {useSelector,useDispatch} from 'react-redux'


const ScheduleTask = (props) =>{
const dispatch = useDispatch();
 // date time picker
 const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
 const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
 const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

 const [activeBtn, setActiveBtn] = useState('daily');
 const [dailyBtnColor, SetDailyBtnColor] = useState(MainStyle.btnActive)
 const [weeklyBtnColor, SetWeeklyBtnColor] = useState(MainStyle.btnInActive)
 const [weekDaysBtnColor, SetWeekDaysBtnColor] = useState(MainStyle.btnInActive)
 const [monthlyBtnColor, SetMonthlyBtnColor] = useState(MainStyle.btnInActive)
 const [yearlyBtnColor, SetYearlyBtnColor] = useState(MainStyle.btnInActive)
 const [customBtnColor, SetCustomBtnColor] = useState(MainStyle.btnInActive)

 const [activeStartDate, setActiveStartDate] = useState('today');
 const [todayBtnColor, SetTodayBtnColor] = useState(MainStyle.btnActive)
 const [tomorrowBtnColor, SetTomorrowBtnColor] = useState(MainStyle.btnInActive)
 const [otherBtnColor, SetOtherBtnColor] = useState(MainStyle.btnInActive)


 const [selectedValue, setSelectedValue] = useState('days');
 const [selectedScheduleVal, setSelectedScheduleVal] = useState(0);

 // settings for all models 
 const [modalVisible, setModalVisible] = useState(false);
 const [weekDaysModalVisible, setWeekDaysModalVisible] = useState(false);
 const [reminderModalVisible, setReminderModalVisible] = useState(false);

 const [monBtnColor, SetMonBtnColor] = useState(MainStyle.btnInActive);
 const [tueBtnColor, SetTueBtnColor] = useState(MainStyle.btnInActive);
 const [wedBtnColor, SetWedBtnColor] = useState(MainStyle.btnInActive);
 const [thuBtnColor, SetThuBtnColor] = useState(MainStyle.btnInActive);
 const [friBtnColor, SetFriBtnColor] = useState(MainStyle.btnInActive);
 const [satBtnColor, SetSatBtnColor] = useState(MainStyle.btnInActive);
 const [sunBtnColor, SetSunBtnColor] = useState(MainStyle.btnInActive);
 const [selectedWeekDays, setSelectedWeekDays] = useState('');

   // Task Details
   const [selectedSchedule, setSelectedSchedule] = useState('');
   const [selectedStartDate, setSelectedStartDate] = useState('');
   const [selectedEndDate, setSelectedEndDate] = useState('');
   const [expoPushToken, setExpoPushToken] = useState('');
   const [notification, setNotification] = useState({});
   
   const [reminderVal, setReminderVal] = useState('');
   const [reminderDateTime, setReminderDateTime] = useState(''); 
   
   const setReminder  = (val) =>{
    const startMinutes = selectedStartDate.getMinutes();
    const startHours = selectedStartDate.getHours();
    const v = val.split(" ")[1];
    const rdt = new Date(selectedStartDate.getTime());
    switch(v){
        case 'Due' : setReminderVal(val); setReminderDateTime(selectedStartDate); break;
        case '5' : setReminderVal(val); rdt.setMinutes(startMinutes-5); setReminderDateTime(rdt);break;
        case '15' : setReminderVal(val); rdt.setMinutes(startMinutes-15); setReminderDateTime(rdt);break;
        case '30' : setReminderVal(val); rdt.setMinutes(startMinutes-30); setReminderDateTime(rdt);break;
        case '1' : setReminderVal(val); rdt.setHours(startHours-1); setReminderDateTime(rdt); break;
        case '2' : setReminderVal(val); rdt.setHours(startHours-2); setReminderDateTime(rdt);break;
        case '8' : setReminderVal(val); rdt.setHours(startHours-8); setReminderDateTime(rdt);;break;
        case '12' : setReminderVal(val); rdt.setHours(startHours-12); setReminderDateTime(rdt);;break;
    }
   }
   useEffect(()=>{if(selectedStartDate!=='')setReminder('On Due')},[selectedStartDate]);
   const {id,title, desc, isRecurring, schedule, startDate,endDate,reminder,reminderVl} = useSelector(state=>{console.log('TAsk received is :'+JSON.stringify(state.task));return state.task});
   const registerForPushNotificationsAsync = async () => {
       if (Constants.isDevice) {
           const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
           let finalStatus = existingStatus;
           if (existingStatus !== 'granted') {
               const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
               finalStatus = status;
           }
           if (finalStatus !== 'granted') {
               alert('Failed to get push token for push notification!');
               return;
           }
           // Checking for local     
           //     token = await Notifications.getExpoPushTokenAsync();
           //     console.log(token);
           //     setExpoPushToken(token);
       } else {
           alert('Must use physical device for Push Notifications');
       }

       if (Platform.OS === 'android') {
           Notifications.createChannelAndroidAsync('default', {
               name: 'default',
               sound: true,
               priority: 'max',
               vibrate: [0, 250, 250, 250],
           });
       }
   };

   const _handleNotification = notification => {
       Vibration.vibrate();
       console.log(notification);
       setNotification(notification);
   };

   useEffect(() => {
       registerForPushNotificationsAsync();

       // Handle notifications that are received or selected while the app
       // is open. If the app was closed and then opened by tapping the
       // notification (rather than just tapping the app icon to open it),
       // this function will fire on the next tick after the app starts
       // with the notification data.
       //_notificationSubscription = 
       Notifications.addListener(_handleNotification);
   }, []);

   const scheduleNotification = async () => {
       let notificationId = Notifications.scheduleLocalNotificationAsync(
           {
               title: title,
               body: desc,
               sound: true
           },
           {
               time: reminderDateTime
           }
       );
       console.log(notificationId);
   };



   const getMaximumDate = todayDate => {
       const nextYear = todayDate.getFullYear() + 1;
       const dt = new Date().setFullYear(nextYear);
       return new Date(dt);
   }

   const hideDatePicker = () => {
       setStartDatePickerVisibility(false);
       setEndDatePickerVisibility(false);
       setDateTimePickerVisibility(false);
   };

   const reminderHandler = (date) => {
       const reminder = typeof(date)==='string'?new Date(Date.parse(date)):date;
       console.warn("A Reminder date has been picked: ", reminder);
       Notifications.cancelAllScheduledNotificationsAsync();
       setReminderDateTime(reminder)
   };

   const startDateHandler = (date) => {
       console.warn("Start Date has been picked: ", date);
       setStartDatePickerVisibility(false);
       setSelectedStartDate(typeof(date)==='string'?new Date(Date.parse(date)):date);
   }

   const endDateHandler = (date) => {
       console.warn("End Date has been picked: ", date);
       setEndDatePickerVisibility(false);
       setSelectedEndDate(typeof(date)==='string'?new Date(Date.parse(date)):date);
   }

   const btnPressHandler = (val) => {
       const act = activeBtn;
       switch (act) {
           case 'daily': SetDailyBtnColor(MainStyle.btnInActive); break;
           case 'weekly': SetWeeklyBtnColor(MainStyle.btnInActive); break;
           case 'weekdays': SetWeekDaysBtnColor(MainStyle.btnInActive); break;
           case 'monthly': SetMonthlyBtnColor(MainStyle.btnInActive); break;
           case 'yearly': SetYearlyBtnColor(MainStyle.btnInActive); break;
           case 'customSchedule': SetCustomBtnColor(MainStyle.btnInActive); break;
       }
       switch (val) {
           case 'daily': SetDailyBtnColor(MainStyle.btnActive);
               setActiveBtn(val);
               setSelectedSchedule(TODO_CONST.DAILY);
               break;
           case 'weekly': SetWeeklyBtnColor(MainStyle.btnActive);
               setActiveBtn(val);
               setSelectedSchedule(TODO_CONST.WEEKLY);
               break;
           case 'weekdays': SetWeekDaysBtnColor(MainStyle.btnActive);
               setWeekDaysModalVisible(true);
               setActiveBtn(val);
               break;
           case 'monthly': SetMonthlyBtnColor(MainStyle.btnActive);
               setActiveBtn(val);
               setSelectedSchedule(TODO_CONST.MONTHLY);
               break;
           case 'yearly': SetYearlyBtnColor(MainStyle.btnActive);
               setActiveBtn(val);
               setSelectedSchedule(TODO_CONST.YEARLY);
               break;
           case 'customSchedule': SetCustomBtnColor(MainStyle.btnActive);
               setModalVisible(true)
               setActiveBtn(val);
               break;
       }
   }

   const startDtBtnPressHandler = (val) => {
       const act = activeStartDate;
       switch (act) {
           case 'today': SetTodayBtnColor(MainStyle.btnInActive); break;
           case 'tomorrow': SetTomorrowBtnColor(MainStyle.btnInActive); break;
           case 'other': SetOtherBtnColor(MainStyle.btnInActive); break;
       }
       switch (val) {
           case 'today': SetTodayBtnColor(MainStyle.btnActive);
               setActiveStartDate(val);
               setSelectedStartDate(new Date());
               break;
           case 'tomorrow': SetTomorrowBtnColor(MainStyle.btnActive);
               setActiveStartDate(val);
               var tomorrow = new Date();
               var dte = new Date().getDate() + 1;
               tomorrow.setDate(dte);
               setSelectedStartDate(tomorrow);
               break;
           case 'other': SetOtherBtnColor(MainStyle.btnActive);
               setActiveStartDate(val);
               setStartDatePickerVisibility(true);
               break;
       }
   }

   const setWeekDays = (val) => {
       switch (val) {
           case TODO_CONST.MON: SetMonBtnColor(monBtnColor === MainStyle.btnInActive ? MainStyle.btnActive : MainStyle.btnInActive)
               break;
           case TODO_CONST.TUE: SetTueBtnColor(tueBtnColor === MainStyle.btnInActive ? MainStyle.btnActive : MainStyle.btnInActive);
               break;
           case TODO_CONST.WED: SetWedBtnColor(wedBtnColor === MainStyle.btnInActive ? MainStyle.btnActive : MainStyle.btnInActive);
               break;
           case TODO_CONST.THU: SetThuBtnColor(thuBtnColor === MainStyle.btnInActive ? MainStyle.btnActive : MainStyle.btnInActive);
               break;
           case TODO_CONST.FRI: SetFriBtnColor(friBtnColor === MainStyle.btnInActive ? MainStyle.btnActive : MainStyle.btnInActive);
               break;
           case TODO_CONST.SAT: SetSatBtnColor(satBtnColor === MainStyle.btnInActive ? MainStyle.btnActive : MainStyle.btnInActive);
               break;
           case TODO_CONST.SUN: SetSunBtnColor(sunBtnColor === MainStyle.btnInActive ? MainStyle.btnActive : MainStyle.btnInActive);
               break;
       }
   }

   useEffect(() => {
       if (monBtnColor === MainStyle.btnActive)
           selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.MON) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.MON));
       else
           setSelectedWeekDays(selectedWeekDays.length > 3 ? selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.MON).join(',') : '');
   }, [monBtnColor])

   useEffect(() => {
       if (tueBtnColor === MainStyle.btnActive)
           selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.TUE) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.TUE));
       else
           setSelectedWeekDays(selectedWeekDays.length > 3 ? selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.TUE).join(',') : '');
   }, [tueBtnColor])

   useEffect(() => {
       if (wedBtnColor === MainStyle.btnActive)
           selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.WED) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.WED));
       else
           setSelectedWeekDays(selectedWeekDays.length > 3 ? selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.WED).join(',') : '');
   }, [wedBtnColor])


   useEffect(() => {
       if (thuBtnColor === MainStyle.btnActive)
           selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.THU) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.THU));
       else
           setSelectedWeekDays(selectedWeekDays.length > 3 ? selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.THU).join(',') : '');
   }, [thuBtnColor])

   useEffect(() => {
       if (friBtnColor === MainStyle.btnActive)
           selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.FRI) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.FRI));
       else
           setSelectedWeekDays(selectedWeekDays.length > 3 ? selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.FRI).join(',') : '');
   }, [friBtnColor])


   useEffect(() => {
       if (satBtnColor === MainStyle.btnActive)
           selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.SAT) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.SAT));
       else
           setSelectedWeekDays(selectedWeekDays.length > 3 ? selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.SAT).join(',') : '');
   }, [satBtnColor])

   useEffect(() => {
       if (sunBtnColor === MainStyle.btnActive)
           selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.SUN) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.SUN));
       else
           setSelectedWeekDays(selectedWeekDays.length > 3 ? selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.SUN).join(',') : '');
   }, [sunBtnColor])

   useEffect(() => {
       if (selectedWeekDays.length == 0) {
           btnPressHandler('daily');
           setSelectedSchedule('daily');
       }
       else
           setSelectedSchedule(selectedWeekDays);
   }, [selectedWeekDays])

   useEffect(() => {
       if (setSelectedScheduleVal > 0) {
           setSelectedSchedule(selectedScheduleVal + ":" + selectedValue)
       }
   }, [selectedValue, setSelectedScheduleVal])

   const scheduleTaskHandler = async () => {
       console.log('Scheduling Task');
       console.log('Id:'+id + 'Title:' + title + 'Desc:' + desc + 'isRecurring :'+isRecurring + 'Task Schedule:' + selectedSchedule + ' start date:' + selectedStartDate
           + 'end date:' + selectedEndDate + 'reminder:' + reminderDateTime + 'reminderVal:'+ reminderVal);
       scheduleNotification();
       const task = {
           taskId: id,
           taskTitle: title,
           taskDesc: desc,
           taskIsRecurring: isRecurring,
           taskSchedule: selectedSchedule,
           taskStartDate: selectedStartDate,
           taskEndDate: selectedEndDate,
           taskReminder: reminderDateTime,
           taskReminderVal: reminderVal
       }
       try {
           await  AsyncStorage.clear();
           await AsyncStorage.setItem(id, JSON.stringify(task))
           dispatch({type:'TASK',task:task});
           alert('Task scheduled successfully for task id:'+id)
       } catch (e) {
           alert('Failed to save task' + e)
       }
   }
   
  useEffect(()=>{ 
   if(schedule!=='' && schedule !== undefined){
    if(schedule.length===3 || new RegExp(",").test(schedule))
       btnPressHandler('weekdays');
    else if(new RegExp(':').test(schedule)){
       btnPressHandler('customSchedule')
     }
    else
       btnPressHandler(schedule);
 
      setWeekDaysModalVisible(false);
      setSelectedWeekDays(schedule)
      setSelectedSchedule(schedule);
      if(startDate !== '' && startDate !== undefined){
         startDtBtnPressHandler('other');
         startDateHandler(startDate);
      }
      endDate!=='' && endDate !== undefined && endDateHandler(endDate);
      reminder !=='' && reminder !== undefined && reminderHandler(reminder)
 }},[])

return(
<View style={MainStyle.toDoContainer}>
        <View style={MainStyle.taskElement}>
            {isRecurring &&
                <View>
                    <View>
                        <Text style={MainStyle.toDoLabelFont}>Schedule</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight style={{ ...styles.button, ...dailyBtnColor }}
                                onPress={() => btnPressHandler(TODO_CONST.DAILY)}>
                                <Text style={MainStyle.buttontText}> Daily </Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={{ ...styles.button, ...weeklyBtnColor }}
                                onPress={() => btnPressHandler(TODO_CONST.WEEKLY)}>
                                <Text style={MainStyle.buttontText}> Weekly </Text>
                            </TouchableHighlight>

                            <View>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={weekDaysModalVisible}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <View style={styles.container}>
                                                <TouchableHighlight
                                                    style={{ ...styles.weekDaysBtn, ...monBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.MON);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Mon</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.weekDaysBtn, ...tueBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.TUE);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Tue</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.weekDaysBtn, ...wedBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.WED);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Wed</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.weekDaysBtn, ...thuBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.THU);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Thu</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.weekDaysBtn, ...friBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.FRI);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Fri</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.weekDaysBtn, ...satBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.SAT);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Sat</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.weekDaysBtn, ...sunBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.SUN);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Sun</Text>
                                                </TouchableHighlight>
                                            </View>
                                            <TouchableHighlight
                                                style={{ ...styles.weekDaysBtn, backgroundColor: "#2196F3" }}
                                                onPress={() => {
                                                    setWeekDaysModalVisible(!weekDaysModalVisible);
                                                }}
                                            >
                                                <Text style={styles.textStyle}>done</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </Modal>
                                <TouchableHighlight style={{ ...styles.button, ...weekDaysBtnColor }}
                                    onPress={() => btnPressHandler('weekdays')}>
                                    {selectedWeekDays == '' ? <Text style={MainStyle.buttontText}> WeekDays </Text> :
                                        <Text style={MainStyle.buttontText}>{selectedWeekDays}</Text>}
                                </TouchableHighlight>
                            </View>


                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight style={{ ...styles.button, ...monthlyBtnColor }}
                                onPress={() => btnPressHandler(TODO_CONST.MONTHLY)}>
                                <Text style={MainStyle.buttontText}> Monthly </Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={{ ...styles.button, ...yearlyBtnColor }}
                                onPress={() => btnPressHandler(TODO_CONST.YEARLY)}>
                                <Text style={MainStyle.buttontText}> Yearly </Text>
                            </TouchableHighlight>
                            <View>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <View style={styles.container}>
                                                <Text>Every</Text>
                                                <TextInput style={{ fontSize: 18, padding: 8 }} placeholder='__' keyboardType="numeric" autoFocus={true} maxLength={3} onChangeText={(v) => setSelectedScheduleVal(v)} />
                                                <Picker
                                                    selectedValue={selectedValue}
                                                    style={{ height: 50, width: 120 }}
                                                    itemStyle={{paddingLeft:0, marginLeft:0}}
                                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                                >
                                                    
                                                    <Picker.Item label="days" value="days"/>
                                                    <Picker.Item label="weeks" value="weeks"></Picker.Item>
                                                    <Picker.Item label="months" value="months" />
                                                </Picker>
                                            </View>
                                            <TouchableOpacity
                                                style={{ ...styles.weekDaysBtn, ...MainStyle.btnAlwaysActiveColor    }}
                                                onPress={() => {
                                                    setModalVisible(!modalVisible);
                                                }}
                                            >
                                                <Text style={styles.textStyle}>done</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>

                                <TouchableHighlight style={{ ...styles.button, ...customBtnColor }}
                                    onPress={() => btnPressHandler('customSchedule')}>
                                    {
                                        selectedScheduleVal > 0 ? <Text style={MainStyle.buttontText}>Every {selectedScheduleVal} {selectedValue}</Text> : <Text style={MainStyle.buttontText}>Custom </Text>
                                    }
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
            }
            </View>
            <View style={MainStyle.taskElement}>
            <View>
                <Text style={MainStyle.toDoLabelFont}>Start Date</Text>
            </View>

                    <View style={{ flexDirection: "row" }}>
                        <TouchableHighlight style={{ ...styles.button, ...todayBtnColor }}
                            onPress={() => startDtBtnPressHandler(TODO_CONST.TODAY)}>
                            <Text style={MainStyle.buttontText}> Today 9:30 Am</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ ...styles.button, ...tomorrowBtnColor }}
                            onPress={() => startDtBtnPressHandler(TODO_CONST.TOMORROW)}>
                            <Text style={MainStyle.buttontText}> Tomorrow 9:30 Am</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ ...styles.button, ...otherBtnColor }}
                            onPress={() => startDtBtnPressHandler('other')}>
                            {selectedStartDate==''? <Image style={{
                                padding: 1,
                                height: 25,
                                width: 25,
                                resizeMode: 'stretch'
                            }} source={calendarIcon} />:<Text style={MainStyle.buttontText}>{selectedStartDate.toLocaleDateString()+" "+selectedStartDate.toLocaleTimeString()}</Text>}
                        </TouchableHighlight>
            </View>
            </View>
            {isRecurring &&
            <View style={{flexDirection:"row"}}>
                <Left>
            <View style={MainStyle.taskElement}>
                <View>
                    <Text style={MainStyle.toDoLabelFont}>End Date</Text>
                </View>
                <TouchableHighlight style={{ ...styles.button, ...otherBtnColor, }}
                    onPress={() => setEndDatePickerVisibility(true)}>
                    {selectedEndDate==''?<Image style={{
                        padding: 1,
                        height: 25,
                        width: 25,
                        resizeMode: 'stretch'
                    }} source={calendarIcon} />:<Text style={MainStyle.buttontText}>{selectedEndDate.toLocaleDateString()+" "+selectedEndDate.toLocaleTimeString()}</Text>}
                </TouchableHighlight>
            </View>
            </Left>
            <Right>
            <View style={MainStyle.taskElement}>
            <View>
                <Text style={MainStyle.toDoLabelFont}>Reminder</Text>
            </View>
            <TouchableHighlight style={{ ...styles.button, ...otherBtnColor }}
                onPress={() => setReminderModalVisible(true)}>
                {reminderVal == ''|| reminderVal == undefined ?<Image style={{
                    padding: 1,
                    height: 25,
                    width: 25,
                    resizeMode: 'stretch'
                }} source={calendarIcon} />:<Text style={MainStyle.buttontText}>{reminderVal}</Text>}
            </TouchableHighlight>
            </View>
            </Right>
            </View>
            }
            {!isRecurring && <View style={MainStyle.taskElement}>
            <View>
                <Text style={MainStyle.toDoLabelFont}>Reminder</Text>
            </View>
            <TouchableHighlight style={{ ...styles.button, ...otherBtnColor }}
                onPress={() => setReminderModalVisible(true)}>
                {reminderVal == '' || reminderVal == undefined ?<Image style={{
                    padding: 1,
                    height: 25,
                    width: 25,
                    resizeMode: 'stretch'
                }} source={calendarIcon} />:<Text style={MainStyle.buttontText}>{reminderVal}</Text>}
            </TouchableHighlight>
            </View>
            }
            <View style={MainStyle.taskElement}>
            <TouchableHighlight style={{ ...MainStyle.btnFull, ...MainStyle.btnActive }} onPress={scheduleTaskHandler}>
                <Text style={{ ...MainStyle.buttontText, fontWeight: "bold", fontSize: 18 }}> Add Task </Text>
            </TouchableHighlight>
             </View>
 
            <DateTimePicker
                isVisible={isStartDatePickerVisible}
                mode="datetime"
                onConfirm={startDateHandler}
                onCancel={hideDatePicker}
            />
            <DateTimePicker
                isVisible={isEndDatePickerVisible}
                mode="datetime"
                onConfirm={endDateHandler}
                onCancel={hideDatePicker}
            />
            <DateTimePicker
                isVisible={isTimePickerVisible}
                mode="datetime"
                onConfirm={reminderHandler}
                onCancel={hideDatePicker}
            />
            <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={reminderModalVisible}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <View style={styles.container}>
                                             <Picker
                                                    selectedValue={selectedValue}
                                                    style={{ height: 50, width: 120 }}
                                                    itemStyle={{paddingLeft:0, marginLeft:0}}
                                                    onValueChange={(itemValue, itemIndex) => setReminder(itemValue)}
                                                    >
                                                    
                                                    <Picker.Item label="on Due" value="on Due"/>
                                                    <Picker.Item label="Before 5 minutes" value="Before 5 minutes"></Picker.Item>
                                                    <Picker.Item label="Before 15 minutes" value="Before 15 minutes"></Picker.Item>
                                                    <Picker.Item label="Before 30 minutes" value="Before 30 minutes"></Picker.Item>
                                                    <Picker.Item label="Before 1 hour" value="Before 1 hour"></Picker.Item>
                                                    <Picker.Item label="Before 2 hours" value="Before 2 hours"></Picker.Item>
                                                    <Picker.Item label="Before 8 hours" value="Before 8 hours"></Picker.Item>
                                                    <Picker.Item label="Before 12 hours" value="Before 12 hours"></Picker.Item>
                                                </Picker>
                                            </View>
                                            <TouchableOpacity
                                                style={{ ...styles.weekDaysBtn}}
                                                onPress={() => {
                                                    setReminderModalVisible(!reminderModalVisible);
                                                }}
                                            >
                                                <Text style={styles.textStyle}>done</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
   </View>
   )
}


const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 20,
        textAlign: "center"
    },
    button: {
        alignItems: "center",
        margin: 4,
        marginTop: 10,
        padding: 2,
        width: 100,
        height: 50,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },

    taskDate: {
        marginTop: 10,
        marginBottom: 2,
        marginLeft: 5
    },
    datePickerHelpButon: {
        flexDirection: "row"
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical:2
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.85,
        shadowRadius: 5.84,
        elevation: 2
    },
    weekDaysBtn: {
        borderRadius: 10,
        padding: 4,
        elevation: 2,
        marginVertical: 5,
        marginHorizontal:3
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        padding:5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        flexDirection: "row",
        paddingTop: 10,
        alignItems: "center",
        alignContent:"center",
    }
   
})

export default ScheduleTask
