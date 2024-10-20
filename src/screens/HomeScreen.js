import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getWeatherHistoryApi,
  getWeatherLiveApi,
} from '../api/WeatherApi';
import {Colors, DIM} from '../utils/constants';
import {useDispatch} from 'react-redux';
import {
  setLiveWeather,
  setWeatherHistory,
} from '../redux/actions/weatherAction';
import moment from 'moment';
import Dashboard from '../assets/dashboardIcon.png';
import RenderWeatherHistory from '../components/RenderWeatherHistory';

const HomeScreen = () => {
  const [state, setState] = useState({
    liveWeather: [],
    weatherHistory: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getWeatherLive();
    getWeatherHistory();
  }, []);

  const getWeatherLive = async () => {
    try {
      const response = await getWeatherLiveApi();
      if (response) {
        setState(prev => ({...prev, liveWeather: response}));
        dispatch(setLiveWeather(response));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherHistory = async () => {
    try {
      const response = await getWeatherHistoryApi();
      if (response) {
        setState(prev => ({...prev, weatherHistory: response}));
        dispatch(setWeatherHistory(response));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.blue,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: DIM.deviceHeight * 0.05,
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: DIM.deviceHeight * 0.03,
            fontWeight: '500',
          }}>
          {state.liveWeather?.location?.city}
        </Text>
        <Text style={styles.date}>
          {moment(state.liveWeather?.timestamp).format('MMM DD,YYYY')}
        </Text>
        <View
          style={{
            marginTop: DIM.deviceHeight * 0.04,
          }}>
          <Image
            source={Dashboard}
            style={{
              height: DIM.deviceHeight * 0.3,
              width: DIM.deviceHeight * 0.6,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            color: Colors.yellow,
            marginStart: DIM.deviceWidth * 0.1,
            marginVertical: DIM.deviceHeight * 0.014,
            fontSize: DIM.deviceHeight * 0.04,
          }}>
          {state.liveWeather?.current_weather?.weather_conditions}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: DIM.deviceHeight * 0.03,
        }}>
        <View style={{}}>
          <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
            }}>
            Temp
          </Text>
          <Text style={styles.values}>
            {state.liveWeather?.current_weather?.temperature} °
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
            }}>
            Wind
          </Text>
          <Text style={styles.values}>
            {state.liveWeather?.current_weather?.wind_speed}km/h
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
            }}>
            Humidity
          </Text>
          <Text style={styles.values}>
            {state.liveWeather?.current_weather?.humidity}%
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: DIM.deviceHeight * 0.03,
            color: Colors.white,
            marginTop: DIM.deviceHeight * 0.04,
            marginStart: DIM.deviceWidth * 0.05,
            fontWeight: '400',
          }}>
          Today
        </Text>
      </View>
      {state.weatherHistory && state.weatherHistory.historical_weather &&
      state.weatherHistory.historical_weather.length > 0 ? (
        <FlatList
          data={state.weatherHistory?.historical_weather}
          renderItem={({item, index}) => {
            return <RenderWeatherHistory item={item} index={index} />;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop:DIM.deviceHeight*0.02,
            marginStart:DIM.deviceWidth*0.04
          }}
        />
      ) : null}
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  values: {
    fontWeight: '800',
    color: Colors.white,
    fontSize: DIM.deviceHeight * 0.02,
    textAlign: 'center',
    marginTop: DIM.deviceHeight * 0.007,
  },
  date: {
    color: Colors.white,
    fontSize: DIM.deviceHeight * 0.02,
    fontWeight: '400',
    marginVertical: DIM.deviceHeight * 0.015,
  },
});
