import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API, apiKey} from '../apis';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city, {rejectWithValue}) => {
    try {
      const response = await API.get(
        `/current.json?key=${apiKey}&q=${city}&aqi=no`,
      );
      const weatherData = response.data;
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return rejectWithValue(error);
    }
  },
);
export const getWeatherForecast = createAsyncThunk(
  'weather/getWeatherForecast',
  async (city, {rejectWithValue}) => {
    try {
      const response = await API.get(
        `/forecast.json?key=${apiKey}&q=${city}&days=7`,
      );
      const weatherData = response.data;
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return rejectWithValue(error);
    }
  },
);
export const getLocations = createAsyncThunk(
  'weather/getLocations',
  async (city, {rejectWithValue}) => {
    try {
      const response = await API.get(`/search.json?key=${apiKey}&q=${city}`);
      const locationsData = response.data;
      return locationsData;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  weather: {},
  getWeatherLoader: false,
  weatherForecast: {},
  getWeatherForecastLoader: false,
  locationsSearch: [],
  getLocationsSearchLoader: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    loadLocalWeather: (state, action) => {
      state.weatherForecast = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.getWeatherLoader = false;
      console.log('getWeather.fulfilled');
    });
    builder.addCase(getWeather.pending, (state, action) => {
      state.getWeatherLoader = true;
      console.log('getWeather.pending');
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      state.getWeatherLoader = false;
      const errorResponse = action.payload.response;
      console.log(
        'getWeather.rejected ',
        errorResponse.status + errorResponse.statusText,
      );
    });
    builder.addCase(getWeatherForecast.fulfilled, (state, action) => {
      state.weatherForecast = action.payload;
      state.getWeatherForecastLoader = false;
      console.log('getWeatherForecast.fulfilled');
    });
    builder.addCase(getWeatherForecast.pending, (state, action) => {
      state.getWeatherForecastLoader = true;
      console.log('getWeatherForecast.pending');
    });
    builder.addCase(getWeatherForecast.rejected, (state, action) => {
      state.getWeatherForecastLoader = false;
      const errorResponse = action.payload.response;
      console.log(
        'getWeatherForecast.rejected ',
        errorResponse.status + errorResponse.statusText,
      );
    });
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locationsSearch = action.payload;
      state.getLocationsSearchLoader = false;
      console.log('getLocations.fulfilled');
    });
    builder.addCase(getLocations.pending, (state, action) => {
      state.getLocationsSearchLoader = true;
      console.log('getLocations.pending');
    });
    builder.addCase(getLocations.rejected, (state, action) => {
      state.getLocationsSearchLoader = false;
      const errorResponse = action.payload.response;
      console.log(
        'getLocations.rejected ',
        errorResponse.status + errorResponse.statusText,
      );
    });
  },
});
export default weatherSlice.reducer;
export const {loadLocalWeather} = weatherSlice.actions;
