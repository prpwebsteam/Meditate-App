import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const CustomCheckbox = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxBase}>
      {isChecked && (
        <View style={styles.checkboxChecked}>
          <Icon name="check" type="material-community" color="#000000" size={12} />
        </View>
      )}
      {!isChecked && <View style={styles.unchecked}></View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unchecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default CustomCheckbox;
