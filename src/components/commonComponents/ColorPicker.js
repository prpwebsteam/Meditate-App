import React, { useState,useMemo } from "react";
import { View, Text, Image, Pressable, Modal, TouchableOpacity } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { ColorPickerStyle } from '../../styles';
import { color_picker_set_action } from "../../redux/action/CommonAction";
import { useDispatch, useSelector } from "react-redux";
import Button from './Button';
import images from '../../index';
import { Colors } from "../../utils";
import { RouteName } from "../../routes";
import { useNavigation,useTheme } from '@react-navigation/native';

const ColorPickerset = (props) => {
  const { Colors } = useTheme();
  const ColorPickerStyles = useMemo(() => ColorPickerStyle(Colors), [Colors]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('');
  const dispatch = useDispatch();
  const onColorChange = (selectedColor) => {
    setCurrentColor(selectedColor);
    dispatch(color_picker_set_action(selectedColor))
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
                    { backgroundColor: currentColor, borderRadius: 7 },
                  ]}
                >
                  <Text style={ColorPickerStyles.setcolorwhite}>{currentColor}</Text>
                  <ColorPicker
                    // ref={r => { picker = r }}
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
                <Button title="ok"
                  buttonStyle={{ backgroundColor: Colors.theme_backgound_second, borderColor: Colors.theme_backgound_second }}
                  onPress={() => {  setModalVisible(false); navigation.replace(RouteName.HOME_SCREEN) }}
                />
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