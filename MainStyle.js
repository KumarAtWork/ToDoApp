import { StyleSheet } from 'react-native'

const MainStyle = StyleSheet.create({
   
   toDoFont:{
    fontSize:21,
    lineHeight:21,
    fontWeight:"200",
   },
   
   toDoLabelFont: {
      fontSize: 17,
      fontWeight: '300',
   },

   taskElement:{
    marginVertical:15
   },

   container: {
      padding: 10
   },
   button1: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 5,
      elevation: 2,
      marginTop: 5
   },

   btnActive: {
      backgroundColor: "#059CE2"
   },
   btnInActive: {
      backgroundColor: "#0280BA"
   },
   btnAlwaysActiveColor:{
      backgroundColor:"#03cafc"
   },

   btnFull: {
      alignItems: "center",
      margin: 4,
      marginTop: 10,
      padding: 30,
      height: 60,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttontText: {
      color: '#fff',
      textAlign: "center"
  }
})

export default MainStyle