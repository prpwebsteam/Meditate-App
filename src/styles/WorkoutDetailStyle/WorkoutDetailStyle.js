import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts } from '../../utils';

export default WorkoutDetailStyle = (Colors) => StyleSheet.create({
  textcenterview: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: SW(15),
  },
  setbgimage: {
    height: SH(300),
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: SW(20)
  },
  viewImageBoxChallengeInnerView: {
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  ImageTitle: {
    color: Colors.theme_backgound,
    fontSize: SF(23),
    paddingHorizontal: SW(10),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  ImageTitleBG: {
    color: Colors.white,
    fontSize: SF(30),
    fontWeight: '600',
    backgroundColor: '#A69F9F',
    width: SW(180),
    textAlign: 'center',
    paddingHorizontal: SW(10)
  },
  ImageTitleText: {
    color: Colors.white,
    fontSize: SF(20),
    fontWeight: '600',
    paddingHorizontal: SW(10)
  },
  leftArrowView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10
  },
  leftArrow: {
    width: 20,
    height: 20,
  },
  ImagebottomContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ImageTitleWorkMinNumber: {
    color: Colors.theme_backgound_second,
    fontSize: SF(29),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  ImageTitleWorkMin: {
    color: Colors.white,
    fontSize: SF(19),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  ImagebottomContentInnerLeft: {
    paddingLeft: SW(40)
  },
  ImagebottomContentDesc: {
    color: Colors.white,
    fontSize: SF(16),
    fontFamily: Fonts.RobotoCondensed_Regular,
    lineHeight: SF(25),

  },
  exercise: {
    width: SW(100),
    backgroundColor: Colors.off_gray
  },
  workoutList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1, // Added bottom border width
    borderBottomColor: '#313131',
  },
  workoutListText: {
    color: Colors.white,
    fontSize: SF(18),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  workoutListTextTime: {
    color: Colors.theme_backgound_second,
    fontSize: SF(18),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  br: {
    borderBottomColor: Colors.theme_backgound_second,
    borderBottomWidth: SH(1),
    height: 0,
    opacity: 0.4
  },
  workoutListMainView: {
    // paddingHorizontal:SW(20),
  },
  imageStyle: {
    width: SW(200),
    height: 200,
    borderRadius: 10,
  },
  boxText: {
    color: Colors.theme_backgound,
    fontSize: SF(20),
    fontFamily: Fonts.RobotoCondensed_Regular,
    paddingHorizontal: SW(10)
  },
  trackThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  centerMainView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 214, 0.2)',
    width: "100%",
    alignSelf: 'center',
    borderRadius: SW(20),
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    paddingTop: SH(50),
  },
  boxTextLight: {
    color: Colors.off_gray,
    fontSize: SF(18),
    fontFamily: Fonts.RobotoCondensed_Regular
  },
  playView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playCenter: {
    width: SW(40),
    height: SH(40),
    backgroundColor: Colors.theme_backgound_second,
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SH(10),
  },
  playViewIcon: {
    width: SW(20),
    height: SH(20),
    marginHorizontal: SW(20)
  },
  playViewIcon2: {
    width: SW(20),
    height: SH(20),
  },
  playViewIconCenter: {
    marginRight: SW(15),
    width: SW(20),
    height: SH(20),
    marginHorizontal: SW(20)
  },
  playViewIconCenterPause: {
    marginRight: SW(20),
    width: SW(20),
    height: SH(20),
    marginHorizontal: SW(20)
  },
  counterMainViewStart: {
    width: "100%",
    height: SH(2),
    backgroundColor: Colors.off_white,
    position: 'relative',
    justifyContent: 'center',
    opacity: 0.9
  },
  counterMainViewStartActive: {
    width: 0,
    height: "100%",
    backgroundColor: Colors.theme_backgound_second,
    alignItems: 'flex-start',
  },
  playTimeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%"
  },
  playTimeText: {
    color: Colors.theme_backgound,
    fontSize: SF(13),
    fontFamily: Fonts.RobotoCondensed_Bold
  },
  off_gray: {
    color: Colors.off_gray,

  },
  stickyButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    padding: SH(20),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  similarMusicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SH(10),
    marginRight: SH(20),
    marginBottom: SH(10),
    backgroundColor: Colors.card,
    borderRadius: SH(10),
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#313131',
  },
  trackThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  trackInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  trackTitle: {
    color: Colors.white,
    fontSize: SF(16),
    fontFamily: Fonts.RobotoCondensed_Bold,
  },
  singer: {
    color: Colors.gray,
    fontSize: SF(14),
    fontFamily: Fonts.RobotoCondensed_Regular,
  },
  trackIcon: {
    width: SH(20),
    height: SH(20),
    marginLeft: 10,
  },
});