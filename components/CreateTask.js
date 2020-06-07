import React, { useState, useEffect } from 'react'
import { View, Modal, ScrollView, Text, Image, TextInput, Platform, StyleSheet, Switch, TouchableHighlight, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import calendarIcon from '../assets/calendar.png'
import { Picker } from '@react-native-community/picker'
import * as TODO_CONST from '../Constants'

const CreateTask = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(false);

    const [activeBtn, setActiveBtn] = useState('daily');
    const [dailyBtnColor, SetDailyBtnColor] = useState(styles.btnActive)
    const [weeklyBtnColor, SetWeeklyBtnColor] = useState(styles.btnInActive)
    const [weekDaysBtnColor, SetWeekDaysBtnColor] = useState(styles.btnInActive)
    const [monthlyBtnColor, SetMonthlyBtnColor] = useState(styles.btnInActive)
    const [yearlyBtnColor, SetYearlyBtnColor] = useState(styles.btnInActive)
    const [customBtnColor, SetCustomBtnColor] = useState(styles.btnInActive)

    const [activeStartDate, setActiveStartDate] = useState('today');
    const [todayBtnColor, SetTodayBtnColor] = useState(styles.btnActive)
    const [tomorrowBtnColor, SetTomorrowBtnColor] = useState(styles.btnInActive)
    const [otherBtnColor, SetOtherBtnColor] = useState(styles.btnInActive)


    const [selectedValue, setSelectedValue] = useState('days');
    const [selectedScheduleVal, setSelectedScheduleVal] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);

    const [weekDaysModalVisible, setWeekDaysModalVisible] = useState(false);
    const [monBtnColor, SetMonBtnColor] = useState(styles.btnInActive);
    const [tueBtnColor, SetTueBtnColor] = useState(styles.btnInActive);
    const [wedBtnColor, SetWedBtnColor] = useState(styles.btnInActive);
    const [thuBtnColor, SetThuBtnColor] = useState(styles.btnInActive);
    const [friBtnColor, SetFriBtnColor] = useState(styles.btnInActive);
    const [satBtnColor, SetSatBtnColor] = useState(styles.btnInActive);
    const [sunBtnColor, SetSunBtnColor] = useState(styles.btnInActive);
    const [selectedWeekDays, setSelectedWeekDays] = useState('');
    
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [dateType, setDateType] = useState('');
    const [reminder, setReminder] = useState('');
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log('mode --'+mode);
        if(mode=='date'){
        if(dateType=='startDate')setSelectedStartDate(currentDate);
        if(dateType=='endDate')setSelectedEndDate(currentDate);
        }
        else if(mode === 'time')
           setReminder(currentDate.getHours()+':'+currentDate.getMinutes());
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = (dateType) => {
        showMode('date');
        console.log('dateType:'+dateType);
        switch(dateType){
            case 'startDate': setDateType('startDate'); break;
            case 'endDate': setDateType('endDate'); break;
        }
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const getMaximumDate = todayDate => {
        const nextYear = todayDate.getFullYear() + 1;
        const dt = new Date().setFullYear(nextYear);
        return new Date(dt);
    }
    const getBtnColor = () => {
        if (count > 0) {

        }
    }

    const btnPressHandler = (val) => {
        const act = activeBtn;
        switch (act) {
            case 'daily': SetDailyBtnColor(styles.btnInActive); break;
            case 'weekly': SetWeeklyBtnColor(styles.btnInActive); break;
            case 'weekdays': SetWeekDaysBtnColor(styles.btnInActive); break;
            case 'monthly': SetMonthlyBtnColor(styles.btnInActive); break;
            case 'yearly': SetYearlyBtnColor(styles.btnInActive); break;
            case 'customSchedule': SetCustomBtnColor(styles.btnInActive); break;
        }
        switch (val) {
            case 'daily': SetDailyBtnColor(styles.btnActive);
                setActiveBtn(val);
                setSelectedSchedule(TODO_CONST.DAILY);
                break;
            case 'weekly': SetWeeklyBtnColor(styles.btnActive);
                setActiveBtn(val);
                setSelectedSchedule(TODO_CONST.WEEKLY);
                break;
            case 'weekdays': SetWeekDaysBtnColor(styles.btnActive);
                setActiveBtn(val);
                break;
            case 'monthly': SetMonthlyBtnColor(styles.btnActive);
                setActiveBtn(val);
                setSelectedSchedule(TODO_CONST.MONTHLY);
                break;
            case 'yearly': SetYearlyBtnColor(styles.btnActive);
                setActiveBtn(val);
                setSelectedSchedule(TODO_CONST.YEARLY);
                break;
            case 'customSchedule': SetCustomBtnColor(styles.btnActive);
                setModalVisible(true)
                setActiveBtn(val);
                break;
        }
    }

    const startDtBtnPressHandler = (val) => {
        const act = activeStartDate;
        switch (act) {
            case 'today': SetTodayBtnColor(styles.btnInActive); break;
            case 'tomorrow': SetTomorrowBtnColor(styles.btnInActive); break;
            case 'other': SetOtherBtnColor(styles.btnInActive); break;
        }
        switch (val) {
            case 'today': SetTodayBtnColor(styles.btnActive);
                setActiveStartDate(val);
                setSelectedStartDate(new Date());
                break;
            case 'tomorrow': SetTomorrowBtnColor(styles.btnActive);
                setActiveStartDate(val);
                var tomorrow = new Date();
                tomorrow.setDate(new Date().getDate()+1);
                setSelectedStartDate(tomorrow);
                break;
            case 'other': SetOtherBtnColor(styles.btnActive);
                setActiveStartDate(val);
                showDatepicker('startDate');
                break;
        }
    }

    const setWeekDays = (val) => {
        switch (val) {
            case TODO_CONST.MON: SetMonBtnColor(monBtnColor === styles.btnInActive ? styles.btnActive : styles.btnInActive)
                break;
            case TODO_CONST.TUE: SetTueBtnColor(tueBtnColor === styles.btnInActive ? styles.btnActive : styles.btnInActive);
                break;
            case TODO_CONST.WED: SetWedBtnColor(wedBtnColor === styles.btnInActive ? styles.btnActive : styles.btnInActive);
                break;
            case TODO_CONST.THU: SetThuBtnColor(thuBtnColor === styles.btnInActive ? styles.btnActive : styles.btnInActive);
                break;
            case TODO_CONST.FRI: SetFriBtnColor(friBtnColor === styles.btnInActive ? styles.btnActive : styles.btnInActive);
                break;
            case TODO_CONST.SAT: SetSatBtnColor(satBtnColor === styles.btnInActive ? styles.btnActive : styles.btnInActive);
                break;
            case TODO_CONST.SUN: SetSunBtnColor(sunBtnColor === styles.btnInActive ? styles.btnActive : styles.btnInActive);
                break;
        }
    }

    useEffect(() => {
        if (monBtnColor === styles.btnActive)
            selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.MON) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.MON));
        else
           setSelectedWeekDays(selectedWeekDays.length>3?selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.MON).join(','):'');
    }, [monBtnColor])

    useEffect(() => {
        if (tueBtnColor === styles.btnActive)
            selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.TUE) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.TUE));
        else
           setSelectedWeekDays(selectedWeekDays.length>3?selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.TUE).join(','):'');
    }, [tueBtnColor])

    useEffect(() => {
        if (wedBtnColor === styles.btnActive)
            selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.WED) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.WED));
        else
           setSelectedWeekDays(selectedWeekDays.length>3?selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.WED).join(','):'');
    }, [wedBtnColor])


    useEffect(() => {
        if (thuBtnColor === styles.btnActive)
            selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.THU) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.THU));
        else
           setSelectedWeekDays(selectedWeekDays.length>3?selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.THU).join(','):'');
    }, [thuBtnColor])

    useEffect(() => {
        if (friBtnColor === styles.btnActive)
            selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.FRI) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.FRI));
        else
           setSelectedWeekDays(selectedWeekDays.length>3?selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.FRI).join(','):'');
    }, [friBtnColor])


    useEffect(() => {
        if (satBtnColor === styles.btnActive)
            selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.SAT) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.SAT));
        else 
           setSelectedWeekDays(selectedWeekDays.length>3?selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.SAT).join(','):'');
    }, [satBtnColor])

    useEffect(() => {
        if (sunBtnColor === styles.btnActive)
            selectedWeekDays == '' ? setSelectedWeekDays(TODO_CONST.SUN) : setSelectedWeekDays(selectedWeekDays.concat(',').concat(TODO_CONST.SUN));
        else
           setSelectedWeekDays(selectedWeekDays.length>3?selectedWeekDays.split(',').filter(elm => elm !== TODO_CONST.SUN).join(','):'');
    }, [sunBtnColor])

    useEffect(()=>{
     if(selectedWeekDays.length==0){
        btnPressHandler('daily');
        setSelectedSchedule('daily');
      } 
     else
         setSelectedSchedule(selectedWeekDays);
    },[selectedWeekDays])

    useEffect(()=>{
      if(setSelectedScheduleVal>0){
          setSelectedSchedule(selectedScheduleVal+","+selectedValue)
      }
    },[selectedValue,setSelectedScheduleVal])

    const addTaskHandler = () =>{
        console.log('Task crearted');
        console.log('Task Schedule:'+selectedSchedule +' start date:'+selectedStartDate.getDate()
           +'end date:'+selectedEndDate.getDate()+'reminder:'+reminder);
    }

    return (<View>
        <View>
            <Text style={styles.screenTitle}>Create Task</Text>
        </View>
        <View style={styles.taskTitle} >
            <TextInput style={{ fontSize: 18, textAlignVertical: "top" }} multiline={true} numberOfLines={5} maxLength={300} placeholder='Title' />
        </View>

        <View style={styles.switchTaskType}>
            <Text style={{ ...styles.taskLabel, flex: 1 }}>Recurring Task :</Text>
            <Switch
                value={value}
                onValueChange={v => {
                    setValue(v);
                }}
            />
        </View>
        <ScrollView>
            {value &&
                <View>
                    <View>
                        <Text style={styles.taskLabel}>Schedule :</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight style={{ ...styles.button, ...dailyBtnColor }}
                                onPress={() => btnPressHandler(TODO_CONST.DAILY)}>
                                <Text style={styles.buttontText}> Daily </Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={{ ...styles.button, ...weeklyBtnColor }}
                                onPress={() => btnPressHandler(TODO_CONST.WEEKLY)}>
                                <Text style={styles.buttontText}> Weekly </Text>
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
                                                    style={{ ...styles.openButton, ...tueBtnColor}}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.TUE);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Tue</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...wedBtnColor}}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.WED);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Wed</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...thuBtnColor}}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.THU);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Thu</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...friBtnColor}}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.FRI);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Fri</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...satBtnColor}}
                                                    onPress={() => {
                                                        setWeekDays(TODO_CONST.SAT);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Sat</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, ...sunBtnColor}}
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
                                    {selectedWeekDays == '' ? <Text style={styles.buttontText}> WeekDays </Text> :
                                        <Text style={styles.buttontText}>{selectedWeekDays}</Text>}
                                </TouchableHighlight>
                            </View>


                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight style={{ ...styles.button, ...monthlyBtnColor }}
                                onPress={() => btnPressHandler(TODO_CONST.MONTHLY)}>
                                <Text style={styles.buttontText}> Monthly </Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={{ ...styles.button, ...yearlyBtnColor }}
                                onPress={() => btnPressHandler(TODO_CONST.YEARLY)}>
                                <Text style={styles.buttontText}> Yearly </Text>
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
                                                <TextInput style={{ fontSize: 18, padding: 8 }} placeholder='__'  keyboardType="numeric" autoFocus={true} maxLength={3} onChangeText={(v) => setSelectedScheduleVal(v)} />
                                                <Picker
                                                    selectedValue={selectedValue}
                                                    style={{ height: 50, width: 150 }}
                                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                                >
                                                    <Picker.Item label="days" value="days" />
                                                    <Picker.Item label="months" value="months" />
                                                </Picker>
                                            </View>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                                onPress={() => {
                                                    setModalVisible(!modalVisible);
                                                }}
                                            >
                                                <Text style={styles.textStyle}>done</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </Modal>

                                <TouchableHighlight style={{ ...styles.button, ...customBtnColor }}
                                    onPress={() => btnPressHandler('customSchedule')}>
                                    {
                                        selectedScheduleVal > 0 ? <Text style={styles.buttontText}>Every {selectedScheduleVal} {selectedValue}</Text> : <Text style={styles.buttontText}>Custom </Text>
                                    }
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
            }

            <View>
                <Text style={styles.taskLabel}>Start Date :</Text>
            </View>

            <View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableHighlight style={{ ...styles.button, ...todayBtnColor }}
                            onPress={() => startDtBtnPressHandler(TODO_CONST.TODAY)}>
                            <Text style={styles.buttontText}> Today </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ ...styles.button, ...tomorrowBtnColor }}
                            onPress={() => startDtBtnPressHandler(TODO_CONST.TOMORROW)}>
                            <Text style={styles.buttontText}> Tomorrow </Text>
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
            {value && <View>
                <View>
                    <Text style={styles.taskLabel}>End Date :</Text>
                </View>
                <TouchableHighlight style={{ ...styles.button, ...otherBtnColor }}
                    onPress={()=>showDatepicker('endDate')}>
                    <Image style={{
                        padding: 1,
                        height: 25,
                        width: 25,
                        resizeMode: 'stretch'
                    }} source={calendarIcon} />
                </TouchableHighlight>
            </View>
            }

            <View>
                <Text style={styles.taskLabel}>Set Reminder :</Text>
            </View>
            <TouchableHighlight style={{ ...styles.button, ...otherBtnColor }}
                onPress={showTimepicker}>
                <Image style={{
                    padding: 1,
                    height: 25,
                    width: 25,
                    resizeMode: 'stretch'
                }} source={calendarIcon} />
            </TouchableHighlight>

            <TouchableHighlight style={{ ...styles.addTask, ...styles.btnActive }} onPress={addTaskHandler}>
                <Text style={{ ...styles.buttontText, fontWeight: "bold", fontSize: 18 }}> Add Task </Text>
            </TouchableHighlight>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={date}
                    maximumDate={getMaximumDate(date)}
                />
            )}
        </ScrollView>
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
    taskTitle: {
        marginTop: 30,
        borderColor: 'gray',
        borderWidth: 1,
    },

    taskLabel: {
        fontSize: 17,
        fontWeight: '300',
        marginTop: 20
    },

    switchTaskType: {
        flexDirection: 'row',
        marginTop: 20
    },
    taskDate: {
        marginTop: 10,
        marginBottom: 2,
        marginLeft: 5
    },
    datePickerHelpButon: {
        flexDirection: "row"
    },
    btnActive: {
        backgroundColor: "#059CE2"
    },
    btnInActive: {
        backgroundColor: "#0280BA"
    },

    addTask: {
        alignItems: "center",
        margin: 4,
        marginTop: 10,
        padding: 30,
        height: 60,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
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
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        marginTop: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        flexDirection: "row",
        paddingTop: 10,
        alignItems: "center"
    },
    buttontText: {
        color: '#fff',
        textAlign: "center"
    }
})

export default CreateTask