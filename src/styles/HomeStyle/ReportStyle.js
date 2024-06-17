import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts } from '../../utils';

export default ReportStyle = (Colors) => StyleSheet.create({
  textcenterview: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // textAlign: 'center',
    paddingHorizontal: SW(15),
  },
  text:{
    fontSize:SF(35),
    color:Colors.theme_backgound_second,
    fontFamily:Fonts.RobotoCondensed_Bold
  },
  textSmall:{
    fontSize:SF(17),
    color:Colors.off_white,
    fontFamily:Fonts.RobotoCondensed_Regular
  },
  firstView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  firstViewBox:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  imageSize:{
    width:SW(100),
    height:SH(100),
  },
  imageSizeSmall:{
    width:SW(20),
    height:SH(20),
  },
  secondViewMain:{
    paddingHorizontal: SW(15),
  },
  secondView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  secondViewTextHistory:{
    fontSize:SF(21),
    color:Colors.white,
    fontFamily:Fonts.RobotoCondensed_Regular
  },

  secondViewTextCalendar:{
    fontSize:SF(21),
    color:Colors.theme_backgound_second,
    fontFamily:Fonts.RobotoCondensed_Regular
  },
  br:{
    borderBottomColor:Colors.theme_backgound_second,
    borderBottomWidth:SH(0.5)
  },
  calendarBorderWidth:{
    borderBottomWidth:SH(6),
    borderBottomColor:Colors.transpharentwhite,

  },
  HeightTextFirst:{
    fontSize:SF(23),
    color:Colors.theme_backgound_second,
    fontFamily:Fonts.RobotoCondensed_Regular
  },
  HeightTextSecond:{
    fontSize:SF(23),
    color:Colors.white,
    fontFamily:Fonts.RobotoCondensed_Regular,
    borderBottomWidth:SH(1),
    borderBottomColor:Colors.white
  },
  graphView:{
    backgroundColor: Colors.transpharentwhite,
    height:SH(250),
    overflow:'hidden',
    paddingHorizontal:SW(20),
    paddingVertical:SW(20)
  
  }
});