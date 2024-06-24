import { StyleSheet } from 'react-native';
import { SF, SH, SW,Fonts } from '../../utils';

export default customStyles = (Colors) => StyleSheet.create({
  SpContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeView: {
    width: '100%'
  },
  SptextStyle: {
    color: Colors.wageningen_green,
    fontSize: SF(45),
    fontFamily: Fonts.Poppins_Medium
  },
  modalcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SH(17),
    position: 'relative',
    backgroundColor: Colors.philippine_silver,
    width: '100%'
  },
  modalView: {
    width: '100%',
    borderRadius: SH(15),
    paddingVertical: SH(20),
    paddingHorizontal: SW(20),
    alignItems: "center",
  },
  modalbuttonClose: {
    alignItems: "flex-end",
    position: 'absolute',
    right: SW(20),
    top: SH(20)
  },
});