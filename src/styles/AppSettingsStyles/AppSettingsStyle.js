import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppSettingsScreen } from '../../screens';
import { SF, SH, SW, Fonts } from '../../utils';

export default Settings = (Colors) =>  StyleSheet.create({

  cellulardatatext: {
      fontSize:20,
      fontFamily:Fonts.RobotoCondensed_Bold,
      color:Colors.theme_backgound,
  },
  toggleswotchview: {
      marginTop:'5%',
      borderBottomWidth:0.3,
      borderBottomColor:Colors.off_gray,
      paddingBottom:22,
      marginBottom:'7%',
      flexDirection:'row',
      justifyContent:'space-between',
  },
 
  downlodtoggleswitchtext: {
    fontFamily:Fonts.RobotoCondensed_Bold,
      color:Colors.theme_backgound,
      fontSize:16,
  },
  righticonminview: {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width:'100%',
      marginTop:'5%',
      borderBottomWidth:1,
      borderBottomColor:Colors.off_gray,
      paddingBottom:17,
  },
  righticonminviewtwo: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    marginTop:'7%',
    borderBottomWidth:1,
    paddingBottom:17,
    borderBottomColor:Colors.red,
},
  chekiconstyle: {
      color:Colors.theme_backgound,
  },
  standardrecommedtext: {
    fontFamily:Fonts.RobotoCondensed_Bold,
    color:Colors.theme_backgound,
    fontSize:16,
  },
  downloadfastertext: {
    fontSize:14.5,
    fontFamily:Fonts.RobotoCondensed_Bold,
    opacity:0.5,
    paddingTop:'3%',
    color:Colors.theme_backgound,
  },
  offlinedoenloadstextset: {
    fontSize:20,
    fontFamily:Fonts.RobotoCondensed_Bold,
    paddingTop:'8%',
    color:Colors.theme_backgound,
  },
  bodysettextwidth: {
      width:'80%',    
  },
  deletedownloads: {
    fontFamily:Fonts.RobotoCondensed_Bold,
    color:Colors.red,
    fontSize:18,
  },
  redcoloricondelete: {
    color:Colors.red,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray,
    opacity: Platform.OS === 'ios' ? 1 : 0.9,
  },

 modalView: { 
backgroundColor: Colors.white,
borderRadius: 7,
width: '90%',
shadowColor: "#000",
flexDirection:'row',
alignItems:'center',
justifyContent:'center',
shadowOffset: {
  width: 0,
  height: 2
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5
},
setshadowstylemodaltwo: {
backgroundColor: Colors.white,
padding:1.2,
borderRadius: 7,
width: '100%',
shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 2
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5
},
centericon: {
flexDirection:'row',
alignItems:'center',
justifyContent:'center',

},
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    color:Colors.theme_backgound,
    fontSize:22,
    fontWeight:'600',
    paddingLeft:10,
    paddingRight:10,
    fontFamily:Fonts.RobotoCondensed_Regular
  },
  togglrswitchflex: {
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
  },
  setbuttonwidth: {
    width:'50%',
    marginHorizontal:'25%',
    paddingBottom:25,
  },

  icomvlose: {
    position:'relative',
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-end',
    top:15,
    left:-15,
  },

  minflexview: {
    width:'93%',
  
  },
  topspaceview: {
    marginTop:20,
  },
  textcenterview: {
    paddingLeft:SH(20),
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
 
});