import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigator from './src/navigation';
import {Splash} from './src/screens/Splash';
import {getWeather} from './src/storage';
import {loadLocalWeather} from './src/store/weather';
import {useDispatch, useSelector} from 'react-redux';

const App = () => {
  const {weatherForecast} = useSelector(state => state.weather);
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);
  const getWeatherLocal = async () => {
    const response = await getWeather();
    console.log('getWeatherLocal', response);
    if (response) {
      dispatch(loadLocalWeather(response));
    }
  };
  useEffect(() => {
    getWeatherLocal();
  }, []);

  return (
    <View style={styles.container}>
      {showSplash ? <Splash /> : <Navigator />}

      {/* <Splash /> */}
      {/* <Navigator /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
