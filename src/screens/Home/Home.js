import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../../assets/images';
import {fontScale, sHeight, sWidth, scale, vScale} from '../../theme/Scale';
import Colors from '../../theme/Colors';
import {getLocations, getWeatherForecast} from '../../store/weather';
import {useDispatch, useSelector} from 'react-redux';
import Font from '../../theme/Font';
import icons from '../../assets/icons';
import {
  DailyForecastItem,
  SearchItem,
  WeatherStats,
} from '../../components/home';
import {storeWeather} from '../../storage';

const Home = () => {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);

  const {weatherForecast, locationsSearch, getWeatherForecastLoader} =
    useSelector(state => state.weather);

  const handleLocation = loc => {
    dispatch(getWeatherForecast(loc));
    setShowSearch(false);
    storeWeather(weatherForecast);
    setLocations([]);
  };
  const handleSearch = text => {
    text.length > 2 && dispatch(getLocations(text));
    setLocations(locationsSearch);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={images.bg}
        blurRadius={70}
        style={styles.imageBackground}
      />
      {/* Search Section */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.textInputContainer,
            {backgroundColor: showSearch ? Colors.label : 'transparent'},
          ]}>
          {showSearch ? (
            <TextInput
              style={styles.textInput}
              placeholder="Search City"
              placeholderTextColor={Colors.gray}
              onChangeText={text => handleSearch(text)}
            />
          ) : null}
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowSearch(!showSearch)}>
            {!showSearch ? (
              <AntDesign name="search1" size={24} />
            ) : (
              <AntDesign name="close" size={24} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.searchList}>
          {locations.length > 0 && showSearch ? (
            <>
              <FlatList
                scrollEnabled={false}
                data={locations}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({item}) => (
                  <SearchItem
                    onPress={() => handleLocation(item.name)}
                    Location={item}
                  />
                )}
                contentContainerStyle={{
                  backgroundColor: Colors.border,
                  borderRadius: vScale(10),
                  paddingHorizontal: scale(10),
                  paddingVertical: vScale(5),
                }}
              />
            </>
          ) : null}
        </View>
      </View>
      {/* forecast section */}
      {getWeatherForecastLoader ? (
        <ActivityIndicator size={'large'} style={{flex: 1}} />
      ) : (
        <>
          <View style={styles.forecastContainer}>
            <Text style={styles.cityText}>
              {weatherForecast.location.name}
              <Text style={styles.countryText}>
                , {weatherForecast.location.country}
              </Text>
            </Text>
            <Image
              source={
                images[weatherForecast.current?.condition?.text || 'other']
              }
              style={styles.weatherImage}
            />
            <View>
              <Text style={styles.tempC}>
                {weatherForecast.current.temp_c}&#176;
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Font.Regular,
                  fontSize: fontScale(30),
                  color: Colors.gray,
                }}>
                {weatherForecast.current.condition.text}
              </Text>
            </View>
            <View style={styles.statsContainer}>
              <WeatherStats
                icon={icons.wind}
                stat={`${weatherForecast.current.wind_kph} kph`}
              />
              <WeatherStats
                icon={icons.drop}
                stat={`${weatherForecast.current.humidity} %`}
              />
              <WeatherStats
                icon={icons.sun}
                stat={`${weatherForecast.forecast.forecastday[0].astro.sunrise}`}
              />
            </View>
          </View>
          {/* Daily Forecast section */}
          <View style={styles.dailyForecastContainer}>
            <View style={styles.dailyForecastTextRow}>
              <AntDesign name="calendar" size={24} color={Colors.white} />
              <Text style={styles.dailyForecastText}>Daily Forecast</Text>
            </View>
            <FlatList
              data={weatherForecast.forecast.forecastday}
              renderItem={({item}) => <DailyForecastItem item={item} />}
              horizontal
              contentContainerStyle={{paddingHorizontal: scale(15)}}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // position: 'relative',
  },
  imageBackground: {
    position: 'absolute',
    width: sWidth,
    height: sHeight,
  },
  searchContainer: {
    marginHorizontal: scale(15),
    zIndex: 1000,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: vScale(30),
    paddingVertical: vScale(5),
    marginBottom: vScale(5),
  },
  textInput: {
    flex: 1,
    marginStart: scale(15),
    color: Colors.white,
  },
  icon: {
    backgroundColor: Colors.gray,
    borderRadius: vScale(30),
    padding: scale(15),
    marginRight: scale(5),
  },

  forecastContainer: {
    marginHorizontal: scale(10),
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: vScale(10),
  },
  cityText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: fontScale(16),
    fontFamily: Font.Bold,
  },
  countryText: {
    color: Colors.gray,
    fontSize: fontScale(14),
    fontFamily: Font.Medium,
  },
  weatherImage: {
    height: vScale(150),
    width: vScale(150),
    alignSelf: 'center',
  },
  tempC: {
    textAlign: 'center',
    fontFamily: Font.Bold,
    fontSize: fontScale(50),
    color: Colors.white,
  },
  dailyForecastText: {
    color: Colors.white,
    fontSize: fontScale(16),
    paddingStart: scale(10),
  },
  dailyForecastContainer: {
    marginBottom: vScale(30),
    paddingVertical: vScale(12),
  },
  dailyForecastTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(30),
    paddingBottom: vScale(20),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(30),
  },
  searchList: {
    position: 'absolute',
    zIndex: 100,
    top: 70,
    width: '100%',
  },
});
