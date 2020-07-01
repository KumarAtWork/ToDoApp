import { StyleSheet } from 'react-native'
import {APP_BTN_ACTIVE_COLOR, APP_BTN_INACTIVE_COLOR} from './ToDoConstants'

const MainStyle = StyleSheet.create({

   toDoBackGround: {
      backgroundColor:"#f5f3f0"
   },
   toDoContainer: {
      margin:5,
      fontSize:18,
      lineHeight:18,
      fontWeight:"200",
   },
   
   toDoTextView:{
      padding:12,
      marginVertical: 5,
      backgroundColor: "#ffffff",
      minHeight:50
   },
   toDoLabelFont: {
      fontSize: 17,
      fontWeight: '300',
   },
   toDoViewColor:{
      backgroundColor:"#ffffff"
   },
   taskElement:{
     marginVertical:15
   },
   button2: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 5,
      elevation: 2,
      marginTop: 5
   },

   btnActive: {
      backgroundColor: APP_BTN_ACTIVE_COLOR
   },
   btnInActive: {
      backgroundColor: APP_BTN_INACTIVE_COLOR
   },
   btnAlwaysActiveColor:{
      backgroundColor:"#03cafc"
   },
   btnFull: {
      marginVertical:10,
      padding: 25,
      height: 40,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttontText: {
      color: '#ffffff',
      textAlign: "center"
  }
})

export default MainStyle