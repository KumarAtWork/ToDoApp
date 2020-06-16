import React,{useState, useEffect} from 'react'
import { AsyncStorage, View,  Vibration, Modal, ScrollView, Text, Image, TextInput, Platform, StyleSheet, Switch, TouchableHighlight, TouchableOpacity, Button } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import calendarIcon from '../assets/calendar.png'
import { Picker } from 'native-base'
import * as TODO_CONST from '../ToDoConstants'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import MainStyle from '../MainStyle'

const ScheduleTask = (props) =>{
 const {title, desc, isRecurring} = props.route.params;
 // date time picker
 const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
 const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
 const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);

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

 const [modalVisible, setModalVisible] = useState(false);

 const [weekDaysModalVisible, setWeekDaysModalVisible] = useState(false);
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
   const [selectedStartDate, setSelectedStartDate] = useState(new Date());
   const [selectedEndDate, setSelectedEndDate] = useState(new Date());
   const [reminder, setReminder] = useState('');
   const [expoPushToken, setExpoPushToken] = useState('');
   const [notification, setNotification] = useState({});



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
       _notificationSubscription = Notifications.addListener(_handleNotification);
   }, []);

   const scheduleNotification = async () => {
       let notificationId = Notifications.scheduleLocalNotificationAsync(
           {
               title: title,
               body: desc,
               sound: true
           },
           {
               time: reminder
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
       console.warn("A Reminder date has been picked: ", date);
       setDateTimePickerVisibility(false);
       Notifications.cancelAllScheduledNotificationsAsync();
       setReminder(date);
   };

   const startDateHandler = (date) => {
       console.warn("Start Date has been picked: ", date);
       setStartDatePickerVisibility(false);
       setSelectedStartDate(date);
   }

   const endDateHandler = (date) => {
       console.warn("End Date has been picked: ", date);
       setEndDatePickerVisibility(false);
       setSelectedEndDate(date);
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
               tomorrow.setDate(new Date().getDate() + 1);
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
           setSelectedSchedule(selectedScheduleVal + "," + selectedValue)
       }
   }, [selectedValue, setSelectedScheduleVal])

   const scheduleTaskHandler = async () => {
       console.log('Scheduling Task');
       console.log('Title:' + title + 'Desc:' + desc + 'isRecurring :'+isRecurring + 'Task Schedule:' + selectedSchedule + ' start date:' + selectedStartDate.getDate()
           + 'end date:' + selectedEndDate.getDate() + 'reminder:' + reminder);
       scheduleNotification();

       const task = {
           taskId: STORAGE_TASK_KEY,
           taskTitle: title,
           taskDesc: desc,
           taskIsRecurring: isRecurring,
           taskSchedule: selectedSchedule,
           taskStartDate: selectedStartDate,
           taskEndDate: selectedEndDate,
           taskReminder: reminder
       }
       try {
           await AsyncStorage.setItem(storage_task_key, JSON.stringify(task))
           alert('Data successfully saved!')
       } catch (e) {
           alert('Failed to save task' + e)
       }
   } 

return(<View style={MainStyle.container}>
        <View style={MainStyle.taskElement}>
            {isRecurring &&
                <View>
                    <View>
                        <Text style={MainStyle.toDoLabelFont}>Schedule :</Text>
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
                                                    style={{ ...styles.openButton, ...monBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.MON);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Mon</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...tueBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.TUE);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Tue</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...wedBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.WED);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Wed</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...thuBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.THU);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Thu</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...friBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.FRI);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Fri</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...satBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.SAT);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Sat</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...sunBtnColor }}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.SUN);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Sun</Text>
                                                </TouchableHighlight>
                                            </View>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
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
                                                style={{ ...styles.openButton, ...MainStyle.btnAlwaysActiveColor    }}
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
                <Text style={MainStyle.toDoLabelFont}>Start Date :</Text>
            </View>

            <View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableHighlight style={{ ...styles.button, ...todayBtnColor }}
                            onPress={() => startDtBtnPressHandler(TODO_CONST.TODAY)}>
                            <Text style={MainStyle.buttontText}> Today </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ ...styles.button, ...tomorrowBtnColor }}
                            onPress={() => startDtBtnPressHandler(TODO_CONST.TOMORROW)}>
                            <Text style={MainStyle.buttontText}> Tomorrow </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ ...styles.button, ...otherBtnColor }}
                            onPress={() => startDtBtnPressHandler('other')}>
                            <Image style={{
                                padding: 1,
                                height: 25,
                                width: 25,
                                resizeMode: 'stretch'
                            }} source={calendarIcon} />
                        </TouchableHighlight>

                    </View>

                </View>
            </View>
            </View>
            <View style={MainStyle.taskElement}>
            {isRecurring && <View>
                <View>
                    <Text style={MainStyle.toDoLabelFont}>End Date :</Text>
                </View>
                <TouchableHighlight style={{ ...styles.button, ...otherBtnColor }}
                    onPress={() => setEndDatePickerVisibility(true)}>
                    <Image style={{
                        padding: 1,
                        height: 25,
                        width: 25,
                        resizeMode: 'stretch'
                    }} source={calendarIcon} />
                </TouchableHighlight>
            </View>
            }
            </View>
            <View style={MainStyle.taskElement}>
            <View>
                <Text style={MainStyle.toDoLabelFont}>Set Reminder :</Text>
            </View>
            <TouchableHighlight style={{ ...styles.button, ...otherBtnColor }}
                onPress={() => setDateTimePickerVisibility(true)}>
                <Image style={{
                    padding: 1,
                    height: 25,
                    width: 25,
                    resizeMode: 'stretch'
                }} source={calendarIcon} />
            </TouchableHighlight>
            </View>
            <View style={MainStyle.taskElement}>
            <TouchableHighlight style={{ ...MainStyle.btnFull, ...MainStyle.btnActive }} onPress={scheduleTaskHandler}>
                <Text style={{ ...MainStyle.buttontText, fontWeight: "bold", fontSize: 18 }}> Add Task </Text>
            </TouchableHighlight>
             </View>

            <DateTimePicker
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={startDateHandler}
                onCancel={hideDatePicker}
            />
            <DateTimePicker
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={endDateHandler}
                onCancel={hideDatePicker}
            />
            <DateTimePicker
                isVisible={isDateTimePickerVisible}
                mode="datetime"
                onConfirm={reminderHandler}
                onCancel={hideDatePicker}
            />
   </View>)
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
        marginTop: 2
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
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 2
    },
    openButton: {
        borderRadius: 10,
        padding: 8,
        elevation: 2,
        marginTop: 5,
        marginHorizontal:2
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
