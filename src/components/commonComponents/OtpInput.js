import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import propTypes from 'prop-types';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {  SH,SW,SF } from '../../utils';
import { useTheme } from '@react-navigation/native';

function Otp(props) {
    const { pinnum, code, onCodeChanged } = props;
    const { Colors } = useTheme();

    const Styles = useMemo(() =>
        StyleSheet.create({
            minviewotpin: {
                width: SW(183),
                height: SH(50),
            },
            settextinputstyle: {
                width: SW(50),
                height: SH(50),
                padding: SH(0),
                color: Colors.theme_backgound,
                backgroundColor: Colors.transpharent,
                fontSize: SF(24),
                borderWidth:SH(0),
                borderWidth: SH(1),
                borderColor: Colors.theme_backgound_second,
                fontWeight: '700',
                borderRadius: SH(5),
                marginHorizontal:SH(10)
            },
            setinputtexttwo: {
                color: Colors.theme_backgound,
                fontSize: SF(24),
                height: SH(50),
                fontWeight: '700',
                borderRadius: SH(0),
            },
        })
    )

    return (
        <OTPInputView
            style={Styles.minviewotpin}
            pinCount={pinnum}
            autoFocusOnLoad={false}
            code={code}
            onCodeChanged={(code) => onCodeChanged(code)}
            codeInputFieldStyle={Styles.settextinputstyle}
            codeInputHighlightStyle={Styles.setinputtexttwo}
        // autoComplete="sms-otp"
        />
    )
}

Otp.defaultProps = {
    title: '',
    placeholder: '',
    titleStyle: {},
    inputStyle: {},
    onCodeChanged: () => { },
    onFocus: () => { },
    onBlur: () => { },
    value: '',
    textprops: {},
    inputprops: {},
    inputType: null,
};

Otp.propTypes = {
    title: propTypes.string,
    placeholder: propTypes.string,
    titleStyle: propTypes.shape({}),
    inputStyle: propTypes.shape({}),
    onCodeChanged: propTypes.func,
    value: propTypes.string,
    textprops: propTypes.object,
    inputprops: propTypes.object,
    onFocus: propTypes.func,
    onBlur: propTypes.func,
    inputType: propTypes.any,
};

export default Otp;
