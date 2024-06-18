import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import propTypes from 'prop-types';
import { SF, SH, SW, Fonts, Colors } from '../../utils';

function Inputs({
  title,
  placeholder,
  titleStyle,
  inputStyle,
  onChangeText,
  value,
  inputprops,
  onBlur,
  onFocus,
  inputType,
  autoFocus,
  secureTextEntry,
  maxLength,
  leftIcon = {},
  rightIcon = {},
  errorMessage = "",
  disabled = false,
  required = false,
  containerStyle,
  onEndEditing,
  inputContainerStyle,
  numberOfLines
}) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { width: '100%', ...containerStyle, marginBottom: SH(0), },
        inputContainerStyle: {
          borderBottomWidth: SH(0),
          width: "100%",
          ...inputContainerStyle
        },
        input_style: {
          width: '100%',
          borderColor: Colors.gray_text_color,
          fontSize: SF(15),
          fontWeight: '600',
          marginBottom: SH(0),
          fontFamily: Fonts.Poppins_Medium,
          color: Colors.white,
          paddingVertical: SH(8),
          paddingHorizontal: SH(10),
          borderRadius: SH(2),
          borderWidth: SH(1),
          ...inputStyle,
        },
        labelStyle: {
          width: '100%',
          fontSize: SF(15),
          color: Colors.white,
          fontFamily: Fonts.Poppins_Medium,
          paddingHorizontal: SW(5),
          ...titleStyle,
          fontWeight: '500',
          paddingVertical: SH(2),
        },
        placeholderStyle: {
          fontSize: SF(12),
          color: Colors.white,
          fontFamily: Fonts.Poppins_Medium
        },
        errorStyle: {
          color: Colors.white,
          fontFamily: Fonts.Poppins_Regular,
        },
      }),
    [title, titleStyle, inputStyle, Colors],
  );

  return (
    <View style={styles.container}>
      <Input
        label={title + (required ? "*" : "")}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        leftIcon={leftIcon}
        placeholderTextColor={'#818181'}
        rightIcon={rightIcon}
        numberOfLines={numberOfLines}
        errorMessage={errorMessage}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        keyboardType={!inputType ? 'default' : inputType}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={Colors.theme_backgound}
        maxLength={maxLength}
        {...inputprops}
        errorStyle={styles.errorStyle}
        inputStyle={styles.input_style}
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        onEndEditing={onEndEditing}
      />
    </View>
  );
}

Inputs.defaultProps = {
  title: '',
  placeholder: '',
  titleStyle: {},
  inputStyle: {},
  onChangeText: () => { },
  onFocus: () => { },
  onBlur: () => { },
  value: '',
  textprops: {},
  inputprops: {},
  inputType: null,
  autoCompleteType: '',
  onEndEditing: () => { },

};

Inputs.propTypes = {
  title: propTypes.string,
  autoCompleteType: propTypes.string,
  placeholder: propTypes.string,
  titleStyle: propTypes.shape({}),
  inputStyle: propTypes.shape({}),
  onChangeText: propTypes.func,
  value: propTypes.string,
  textprops: propTypes.object,
  inputprops: propTypes.object,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  inputType: propTypes.any,
  onEndEditing: propTypes.func,
};

export default Inputs;
