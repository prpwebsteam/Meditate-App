import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts } from '../../utils';

export default AgeStyle=(Colors)=> StyleSheet.create({
  textcenterview: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: SW(15),
  },
  Text: {
    color: Colors.theme_backgound_second,
    fontSize: SF(25),
    textAlign: 'center',
    fontFamily:Fonts.RobotoCondensed_Regular
  },
  TextBold: {
    fontFamily:Fonts.RobotoCondensed_Bold
  },
  TextNormal:{
    color: Colors.theme_backgound,
    fontSize: SF(20),
    textAlign: 'center',
    lineHeight:SH(23),
    fontFamily:Fonts.RobotoCondensed_Regular

  },
  yourAgeMainBox:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
   },
 
   PrevButton:{
    width:SW(50),
    height:SH(50),
    alignSelf:'flex-end',
    backgroundColor:Colors.transpharent,
    borderColor:Colors.theme_backgound_second,
    borderWidth:2
    },
  nextButton:{
  width:SW(150),
  alignSelf:'flex-end',
  },
  buttonView:{
    paddingHorizontal:SW(20)
  },
  AgePickerView:{
    backgroundColor:Colors.transpharent,
    width: SW(80), 
    height: SH(215),
    transform: [{ scale: 1.5 }] ,
    fontFamily:Fonts.RobotoCondensed_Regular

    },
    buttonMainView:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    WeightPickerView:{
      backgroundColor:Colors.theme_backgound,
      width: SW(100), 
      height: SH(215),
      transform: [{ scale: 1.5 }] 
      },
    GoalPickerView:{
      backgroundColor:Colors.theme_backgound,
      width: SW(200), 
      height: SH(215),
      transform: [{ scale: 1.5 }] 
      },
});