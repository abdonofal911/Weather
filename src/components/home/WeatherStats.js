import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, vScale} from '../../theme/Scale';
import Colors from '../../theme/Colors';

const WeatherStats = ({icon, stat}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Image
        source={icon}
        style={{
          width: vScale(24),
          height: vScale(24),
          marginEnd: scale(10),
        }}
      />
      <Text style={{color: Colors.white}}>{stat}</Text>
    </View>
  );
};

export default WeatherStats;

const styles = StyleSheet.create({});
