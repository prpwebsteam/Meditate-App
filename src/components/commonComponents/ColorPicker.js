import React, { useState, useMemo } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { ColorPickerStyle } from '../../styles';
import { color_picker_set_action } from "../../redux/action/CommonAction";
import { useDispatch } from "react-redux";
import images from '../../index';
import { useNavigation, useTheme } from '@react-navigation/native';

const ColorPickerset = (props) => {
  const { Colors } = useTheme();
  const ColorPickerStyles = useMemo(() => ColorPickerStyle(Colors), [Colors]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('');
  const dispatch = useDispatch();
  const onColorChange = (selectedColor) => {
    setCurrentColor(selectedColor);
    dispatch(color_picker_set_action(selectedColor));
  };
  const navigation = useNavigation();

  return (
    <View>
      <View style={ColorPickerStyles.centeredViewtwo}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={ColorPickerStyles.centeredView}>
            <View style={ColorPickerStyles.modalView}>
              <View style={ColorPickerStyles.setheight}>
                <View
                  style={[
                    { backgroundColor: currentColor, borderRadius: 7, padding: 10 },
                  ]}
                >
                  <Text style={[ColorPickerStyles.setcolorwhite, { color: '#000' }]}>{currentColor}</Text>
                  <ColorPicker
                    color={currentColor}
                    onColorChange={onColorChange}
                    onColorSelected={'red'}
                    thumbSize={50}
                    noSnap={true}
                    defaultProps={true}
                    row={false}
                    gapSize={0}
                    discreteLength={0}
                    sliderHidden={true}
                    discrete={true}
                  />
                </View>
              </View>
              <View style={ColorPickerStyles.setbuttonwidth}>
                <TouchableOpacity 
                  style={{
                    backgroundColor: Colors.theme_backgound_second, 
                    padding: 10, 
                    alignItems: 'center', 
                    borderRadius: 5, 
                    borderColor: Colors.theme_backgound_second, 
                    borderWidth: 1
                  }}
                  onPress={() => { setModalVisible(false); navigation.replace(RouteName.HOME_SCREEN) }}
                >
                  <Text style={{ color: Colors.black }}>ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image style={ColorPickerStyles.colorpickerpickerimagwidth} resizeMode='cover' source={images.colorpicker} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ColorPickerset;