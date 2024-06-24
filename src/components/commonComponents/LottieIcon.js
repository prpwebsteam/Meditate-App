import React, { useMemo } from 'react';
import {StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';

function LottieIcon(props) {
  const {style ,source,loop=true } = props;

  return (
    <Lottie
    style={style}
    source={source} 
    autoPlay 
    loop={loop}
    />
  );
}

export default LottieIcon;
