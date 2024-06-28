import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts,  ColorTheme } from '../../utils';

export default HelpStyle = (Colors) => StyleSheet.create({
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  bgcolorset: {
    backgroundColor: ColorTheme.BGScreen
  },
  keybordtopviewstyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minviewsigninscreen: {
    width: '90%',
    height: '100%',
    marginHorizontal: '5%',
  },
  minflexview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 200,
    paddingTop: 5,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  settextinputwidth: {
    backgroundColor: 'rgba(217, 217, 214, 0.3)',
    borderRadius: 7,
    paddingBottom: 100,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000',
    fontFamily: Fonts.RobotoCondensed_Regular,
  },  
  descriptionText: {
    fontSize: 16,
    color: '#f79f80',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 25
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  setsubinputwidth: {
    backgroundColor: 'rgba(217, 217, 214, 0.3)',
    borderRadius: 7,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000',
    fontFamily: Fonts.RobotoCondensed_Regular,
  },
  settextinputtext: {
    fontFamily: Fonts.RobotoCondensed_Regular,
    color: Colors.theme_backgound,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 20,
  },
  setbuttonstyle: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  settopspace: {
    paddingTop: 25,
  }
});