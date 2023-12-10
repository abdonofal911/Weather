import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {sHeight, sWidth, scale, vScale} from '../../theme/Scale';
import images from '../../assets/images';

const Splash = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <ImageBackground
        source={images.bg}
        blurRadius={70}
        style={styles.imageBackground}
      />
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/7477/7477790.png',
        }}
        style={{width: scale(300), height: vScale(300)}}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    width: sWidth,
    height: sHeight,
  },
});
