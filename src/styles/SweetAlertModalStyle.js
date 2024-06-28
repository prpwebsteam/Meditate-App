import { StyleSheet ,Platform} from 'react-native';
import { SF, SH,  widthPercent, SW,Fonts } from '../utils';

export default SweetAlertModalStyle = (Colors) => StyleSheet.create({
    settext: {
        color: Colors.theme_backgound,
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        fontFamily:Fonts.RobotoCondensed_Regular
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        backgroundColor: Colors.transpharent,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingTop: 20,
        paddingBottom: 20,
        width: '95%'
    },
    setroundcenter: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    checkiconright: {
        borderWidth: 3,
        height: 80,
        width: 80,
        borderRadius: 100,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    setbackgroundicon: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
    },
    registertextset: {
        paddingTop: 25,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonminview: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingTop: 20,
    },
    setokbutton: {
        width: '30%'
    },
    setbgcolorgrsay: {
        backgroundColor: Colors.gray,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        opacity: Platform.OS === 'ios' ? 2 : 0.9,
    },
    loginSuccessIcon:{
        width:SW(180),
        alignSelf:'center',
        tintColor: 'black'
    }
});