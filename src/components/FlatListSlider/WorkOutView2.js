import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { SH, SF } from '../../utils';

const WorkOutView = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.imageBackground}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SH(10),
    borderRadius: SH(10),
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: SH(150),
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SH(10),
  },
  title: {
    color: 'white',
    fontSize: SF(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: 'white',
    fontSize: SF(12),
    textAlign: 'center',
    marginTop: SH(5),
  },
});

export default WorkOutView;
