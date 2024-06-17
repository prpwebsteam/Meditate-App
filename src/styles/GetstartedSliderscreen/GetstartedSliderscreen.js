import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts } from '../../utils';

export default GetstartedSliderStyle = (Colors)=> StyleSheet.create({
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: SW(15),

  },

  smallimagcenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  imageSlide1: {
    width: SW(250),
    objectFit: 'cover',
  },
  imageSlide2: {
    width: SW(450),
  },
  imageSlide3: {
    width: SW(450),
  },
  imagesetus: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
  },
  textcenterview: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 20
  },
  sliderText: {
    color: Colors.white,
    fontSize: SF(14),
    textAlign: 'center',
    lineHeight: SH(20),
    fontFamily:Fonts.RobotoCondensed_Regular
  },
  sliderText1: {
    color: Colors.white,
    fontSize: SF(14),
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: SH(20),
    fontFamily:Fonts.RobotoCondensed_Regular
  },
  sliderTextBold: {
    fontFamily:Fonts.RobotoCondensed_Bold

  },
  nextbuttoncolorset: {
    color: Colors.theme_backgound_second,
  },
  buttonCircle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
  },
  activebutonstyleset: {
    width: 5,
    height: 5,
    backgroundColor: Colors.theme_backgound_second,
    borderRadius: 100,
  },
  dotStyle:{
    width: 5,
    height: 5,
    backgroundColor: Colors.gray,
    borderRadius: 100
  },
 mainInnerView: {
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});