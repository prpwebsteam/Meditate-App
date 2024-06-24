import React, { useMemo } from "react";
import { Modal, Text, View } from "react-native";
import SweetAlertModalStyle from '../../styles/SweetAlertModalStyle';
import Button from './Button';
import LottieIcon from './LottieIcon';
import propTypes from 'prop-types';
import images from "../../index";
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

function SweetaelertModal(props) {
    const { Colors } = useTheme();
    const Style = useMemo(() => SweetAlertModalStyle(Colors), [Colors]);
    const { message, modalVisible, setModalVisible, onPress, onPressCancel, buttonText, cancelButtonText, iconVisible, loginSuccess = false, success = false } = props;

    return <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
    >
        <View style={Style.setbgcolorgrsay}>
            <View style={Style.centeredView}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[Colors.theme_linear_gradient_1, Colors.theme_linear_gradient_2, Colors.theme_linear_gradient_3, Colors.theme_linear_gradient_4, Colors.theme_linear_gradient_2, Colors.theme_linear_gradient_4, Colors.theme_linear_gradient_2]}
                    style={Style.modalView}>

                    {iconVisible &&
                        <View style={Style.setroundcenter}>
                            <View style={Style.checkiconright}>
                            </View>
                        </View>
                    }
                    {loginSuccess &&
                        <LottieIcon
                            style={Style.loginSuccessIcon}
                            source={images.loginSuccess}
                            loop={false}
                        />
                    }
                    {success &&
                        <LottieIcon
                            style={Style.loginSuccessIcon}
                            source={images.success}
                            loop={false}
                        />
                    }
                    <View style={Style.registertextset}>
                        <Text style={Style.settext}>{message}</Text>
                    </View>
                    <View style={Style.buttonminview}>
                        {onPress &&
                            <View style={Style.setokbutton}>
                                <Button
                                    title={buttonText}
                                    onPress={() => onPress()}
                                />
                            </View>
                        }
                        {cancelButtonText ?
                            <View style={Style.setokbutton}>
                                <Button title={cancelButtonText}
                                    onPress={() => { onPressCancel() }}
                                />
                            </View>
                            : null
                        }


                    </View>
                </LinearGradient>
            </View>
        </View>
    </Modal>;
}

SweetaelertModal.defaultProps = {
    message: '',
    setModalVisible: () => { },
    modalVisible: false,
    onPress: () => { },
    onPressCancel: () => { },
    buttonText: 'Ok',
    cancelButtonText: '',
    iconVisible: false
};

SweetaelertModal.propTypes = {
    message: propTypes.string,
    setModalVisible: propTypes.func,
    modalVisible: propTypes.boolean,
    onPress: propTypes.func,
    onPressCancel: propTypes.func,
    buttonText: propTypes.string,
    cancelButtonText: propTypes.string,
    iconVisible: propTypes.boolean
};

export default SweetaelertModal;
