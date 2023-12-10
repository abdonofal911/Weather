import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeWeather = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('cityWeather', jsonValue);
    console.log('storeWeather Local', jsonValue);
  } catch (error) {
    console.log('Error storing value: ', error);
  }
};

export const getWeather = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('cityWeather');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('Error retrieving value: ', error);
  }
};
