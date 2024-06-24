import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, Colors } from '../../utils';

export default Authentication = (Colors) => StyleSheet.create({
  textcenterview: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: SW(15),
  },
  Text: {
    color: Colors.white_text_color,
    fontSize: SF(25),
    textAlign: 'center',
  },
  TextBold: {
    fontFamily: Fonts.Poppins_Medium
  },
  TextNormal: {
    color: Colors.white_text_color,
    fontSize: SF(15),
    textAlign: 'center',
    lineHeight: SH(20)
  },
  yourSelfRoundMainBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourSelfRoundActiveBox: {
    backgroundColor: Colors.theme_background,
  },
  yourSelfRoundBox: {
    width: SW(120),
    height: SH(120),
    backgroundColor: Colors.gray_text_color,
    borderRadius: SH(120),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  yourSelfRoundText: {
    color: Colors.white_text_color,
    fontSize: SF(20),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  nextButton: {
    alignSelf: 'center',
    width: '50%'
  },
  agebutton: {
    alignSelf: 'center',
    width: '70%'
  },
  buttonView: {
    paddingHorizontal: SW(20),
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  yourSelfRoundImage: {
    width: SW(30),
    height: SH(30),
    tintColor: Colors.white_text_color,
  },
  setbgMainView: {
    flex: 1,
  },
  setbgimage: {
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: SW(20)
  },
  loginSignUpTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SH(10),
  },
  imageText: {
    fontSize: SF(24),
    marginRight: 5,
    color: Colors.white_text_color,
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  loginTab: {
    marginTop: SH(300),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignUpTab: {
    marginTop: SH(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginSignUpText: {
    color: Colors.white_text_color,
    fontSize: SF(20),
    marginHorizontal: SW(10),
    lineHeight: SH(45),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  activeBorder: {
    borderColor: Colors.white_text_color,
    borderBottomWidth: SW(2),
  },
  inputView: {
    paddingHorizontal: SH(30),
    color: Colors.white,
    marginBottom: 50
  },
  forgotText: {
    color: Colors.white,
    alignSelf: 'flex-end',
    fontSize: SF(12),
    fontFamily: Fonts.Poppins_Medium,
    paddingRight: SW(15),
    marginTop: -20, 
  },
  signupText: {
    color: Colors.white,
    fontSize: SF(12),
    fontFamily: Fonts.Poppins_Medium,
    paddingRight: SW(15),
    marginTop: -20, 
  },
  verificationInputView: {
    marginTop: SH(300),
    marginBottom: SH(30)
  },
  verificationTextTitle: {
    color: Colors.white,
    fontSize: SF(25),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  verificationText: {
    color: Colors.black_stext_color,
    fontSize: SF(16),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  resendText: {
    color: Colors.white_text_color,
    paddingTop: SH(10),
    textAlign: 'center',
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  VerifyButton: {
    width: SW(150),
    alignSelf: 'center'
  },

  buttonMainView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  PrevButton: {
    width: SW(50),
    height: SH(50),
    alignSelf: 'flex-end',
    backgroundColor: Colors.transpharent,
  },
  verifyMainView: {
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: SW(20),
  },

  MainViewSingle: {
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  PassWordStyle: {
    paddingBottom: SH(0),
    marginBottom: SH(0),
    height: SH(80),
    color: Colors.white
  },
  // Start Otp Screen style
  MinFlexView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  MinViewSecond: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  EnterSixDigitText: {
    fontSize: SF(30),
    textAlign: 'center',
    paddingBottom: SH(15),
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
  },
  paregraph: {
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(11),
  },
  OtpViewStyles: {
    width: '100%',
    height: SH(100)
  },
  CodeInputStyles: {
    width: SW(50),
    height: SH(51),
    padding: SH(0),
    borderWidth: 2.5,
    fontSize: SF(28),
    fontWeight: '700',
    borderRadius: SW(7),
    color: Colors.black_text_color,
    borderColor: Colors.theme_background
  },
  buttonotp: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ParegraPhotpBottom: {
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(13),
    paddingRight: SH(10),
  },
  ResendTextBold: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.theme_background,
    textAlign: 'center'
  },
  MinViewScreen: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white_text_color,
  },
  FlexRowText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }, 
});