import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/Colors';
import {fontScale, scale, vScale} from '../../theme/Scale';
import Font from '../../theme/Font';

const SearchItem = ({onPress, Location}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AntDesign name="enviromento" size={14} />
      <Text style={styles.location}>
        {Location.name} , {Location.country}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth * 0.5,
    paddingVertical: vScale(15),
    width: '100%',
    paddingStart: scale(15),
    borderRadius: vScale(5),
    alignItems: 'center',
  },
  location: {
    marginStart: scale(10),
    color: Colors.black,
    fontSize: fontScale(14),
    fontFamily: Font.Regular,
  },
});
