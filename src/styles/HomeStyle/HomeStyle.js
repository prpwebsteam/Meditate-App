import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts } from '../../utils';

export default HomeStyle = (Colors) => StyleSheet.create({
  textcenterview: {
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: SW(20),
  },
  HomeCommonTitle: {
    color: Colors.theme_backgound,
    paddingBottom: 55
  },
  HomeCommonTitle: {
    color: Colors.theme_backgound_second,
    fontSize: SF(17),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  textView: {
    paddingHorizontal: SW(0),
  },
  HomeCommonView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewAllColor: {
    color: Colors.theme_backgound_second
  },
  viewImageBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: SH(140),
    // width: SW(140),
    position: 'relative',
    backgroundColor: Colors.white,
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: SW(10),
    paddingVertical: SW(10),
    elevation: 10,
    shadowColor: Colors.theme_backgound_second,
  },
  setbgimage: {
    height: SH(40),
    width: SW(40),
    alignSelf: 'flex-end'
  },
  ImageTitle: {
    color: Colors.theme_backgound_second,
    fontSize: SF(17),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  ImageTitleDaySize: {
    color: Colors.theme_backgound,
    fontSize: SF(20),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  colorWhite: {
    color: Colors.white
  },
  viewImageBoxChallenge: {
    marginRight: SW(20),
    height: SH(280),
    width: SW(360),
    position: 'relative',
    backgroundColor: Colors.theme_backgound,
    overflow: "hidden",
    borderRadius: 10
  },
  challengeImageTitle: {
    color: Colors.white,
    fontSize: SF(14),
    fontWeight: '00',
    paddingHorizontal: SW(10),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  challengeImageTitleBG: {
    color: Colors.white,
    fontSize: SF(28),
    backgroundColor: '#A69F9F',
    width: '70%',
    textAlign: 'center',
    paddingHorizontal: SW(10),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  challengeImageTitleText: {
    color: Colors.white,
    fontSize: SF(20),
    paddingHorizontal: SW(10),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  viewImageBoxChallengeInnerView: {
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  StartButton: {
    width: '80%'
  },
  RecentAllViewBox: {
    paddingHorizontal: SW(10),
    paddingVertical: SW(10),
    flexBasis: '50%'
  },
  RecentAllView: {
    // marginRight:SW(20),
    // flex: 1,
    // flexWrap: 'wrap',
    // flexDirection: 'row'
  },
  RecentAllViewmargin: {
    marginRight: SW(20)
  },
  ImageTitleOther: {
    color: Colors.white,
    fontSize: SF(21),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  ImageTitleOtherSmall: {
    color: Colors.white,
    fontSize: SF(15),
    fontFamily: Fonts.RobotoCondensed_Regular
  },

  VideoviewImageBox: {
    height: SH(200),
    width: '100%',
    position: 'relative',
    backgroundColor: Colors.theme_backgound,
    overflow: "hidden",
    borderRadius: 10
  },
  videoInnerView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  VideoTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SW(25)
  },
  VideoTabText: {
    color: Colors.theme_backgound,
    fontSize: SF(20),
    marginHorizontal: SW(10),
    lineHeight: 45,
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  activeBorder: {
    borderColor: Colors.theme_backgound_second,
    borderBottomWidth: 2,
  },
  counterStyleView: {
    width: '100%'
  },
  stepText: {
    color: Colors.white,
    fontSize: SF(25),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  counterText: {
    color: Colors.white,
    fontSize: SF(30),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  boxtexttime: {
    color: Colors.theme_backgound_second,
    fontSize: SF(24),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  boxtextlocation: {
    color: Colors.white,
    fontSize: SF(24),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  boxtextkm: {
    color: Colors.white,
    fontSize: SF(24),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  bottomBox: {
    backgroundColor: Colors.transpharentwhite,
    paddingHorizontal: SW(20),
    paddingVertical: SH(30),
    borderRadius: SH(15)
  },
  userIcon: {
    width: SW(30),
    height: SH(30),
    borderRadius: SH(30),
    overflow: 'hidden'
  },
  userIconView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userTitle: {
    color: Colors.theme_backgound,
    color: Colors.theme_backgound_second,
    fontSize: SF(17),
    fontFamily: Fonts.RobotoCondensed_Regular,
    paddingHorizontal: SW(10)
  },
  userIconBox: {
    overflow: 'hidden',
    paddingHorizontal: SW(8),
    paddingVertical: SW(8),
    backgroundColor: Colors.white,
    borderRadius: SH(10)

  },
  heading: {
    color: Colors.theme_backgound,
    color: Colors.theme_backgound_second,
    fontSize: SF(19),
    fontFamily: Fonts.RobotoCondensed_Bold,
  },
  viewImageBoxYoga: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.white,
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: SW(10),
    paddingVertical: SW(10),
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  setbgimageYoga: {
    height: SH(100),
    alignSelf: 'center'
  },
  ImageTitleDaySizeYoga: {
    color: Colors.theme_backgound,
    fontSize: SF(16),
    fontFamily: Fonts.RobotoCondensed_Bold,
    textAlign: 'center'
  },
  RecentAllViewBoxYoga: {
    paddingHorizontal: SW(10),
    paddingVertical: SW(10),
    flexBasis: '50%',
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  RecentAllViewBoxYogaBoxTopSpace: {
    marginTop: SH(30)
  },
  RecentAllViewBoxYogaBoxBottomSpace: {
    marginBottom: SH(30)
  },
  viewImageBoxCategory: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  RecentAllViewBoxCategory: {
    paddingHorizontal: SW(10),
    paddingVertical: SW(10),
    flexBasis: '50%',
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  setbgimageCategory: {
    width: "100%",
    alignSelf: 'center'
  },
  ImageTitleDaySizeCategory: {
    color: Colors.theme_backgound,
    fontSize: SF(16),
    fontFamily: Fonts.RobotoCondensed_Regular,
    textAlign: 'center'
  },
  viewImageBoxBgCategory: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.white,
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: SW(10),
    paddingVertical: SW(10),
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    width: "100%"

  },
  textViewCategory: {
    paddingHorizontal: SW(10),
  },
  meditationImageView: {

  },
  meditationImageicon: {
    width: "100%"
  },
  RecentAllViewBoxMeditation: {
    paddingHorizontal: SW(10),
    paddingVertical: SW(10),
  },
  viewImageBoxMeditation: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
    backgroundColor: Colors.white,
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: SW(15),
    paddingVertical: SW(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  ImageTitleDaySizeMeditation: {
    color: Colors.theme_backgound,
    fontSize: SF(16),
    fontFamily: Fonts.RobotoCondensed_Bold,
    textAlign: 'left'
  },
  ImageDescriptionMeditation: {
    color: Colors.theme_backgound,
    fontSize: SF(16),
    fontFamily: Fonts.RobotoCondensed_Regular,
    textAlign: 'left'
  },
  ImageTitleDaySizeMeditationTime: {
    backgroundColor: Colors.theme_backgound_secondLight,
    color: Colors.theme_backgound_second,
    width: "30%",
    paddingHorizontal: SW(10),
    paddingVertical: SH(7),
    borderRadius: SH(10)
  },
  setbgimageMeditation: {
    width: SW(100),
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
  },
  viewImageBoxTextMeditation: {
    paddingRight: SW(23)
  }
}); 