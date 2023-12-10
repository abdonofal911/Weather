import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, vScale} from '../../theme/Scale';
import images from '../../assets/images';
import Colors from '../../theme/Colors';
import Font from '../../theme/Font';

const DailyForecastItem = ({item}) => {
  const dateString = item.date;
  const date = new Date(dateString);
  const options = {weekday: 'long'};
  const dayName = new Intl.DateTimeFormat('en-US', options).format(date);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        paddingHorizontal: scale(15),
        paddingVertical: vScale(20),
        borderRadius: vScale(20),
        marginEnd: scale(15),
      }}>
      <Image
        source={{uri: `https:${item.day.condition.icon}`}}
        style={{width: scale(35), height: scale(35)}}
      />
      <Text style={{color: Colors.white, paddingTop: vScale(5)}}>
        {dayName}
      </Text>
      <Text
        style={{
          fontFamily: Font.Medium,
          color: Colors.white,
        }}>
        {item.day.maxtemp_c}&#176;
      </Text>
    </View>
  );
};

export default DailyForecastItem;

const styles = StyleSheet.create({});
