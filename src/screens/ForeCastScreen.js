import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, DIM } from '../utils/constants';
import { setWeatherForecast } from '../redux/actions/weatherAction';
import { getWeatherForecastApi } from '../api/WeatherApi';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import RenderWeatherHistory from '../components/RenderWeatherHistory';
import RenderWeatherForecast from '../components/RenderWeatherForecast';

const ForeCastScreen = () => {
 const [state, setState] = useState({
    weatherForecast : []
  });
  const current = moment();
  const dispatch = useDispatch();

  const weatherHistory = useSelector(state => state.weather.weatherHistory);

  useEffect(() => {
    getWeatherForecast();
  },[]);

    const getWeatherForecast = async () => {
      try {
        const response = await getWeatherForecastApi();
        if (response) {
          setState((prev) => ({...prev,weatherForecast : response}))
          dispatch(setWeatherForecast(response));
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
      <Text
        style={{
          color: Colors.white,
          textAlign: 'center',
          marginTop: DIM.deviceHeight * 0.05,
          fontSize: DIM.deviceHeight * 0.03,
          fontWeight: '500',
        }}>
        Forecast report
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: DIM.deviceHeight * 0.065,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: DIM.deviceWidth * 0.06,
        }}>
        <Text
          style={{
            fontSize: DIM.deviceHeight * 0.03,
            color: Colors.white,
            fontWeight: '400',
          }}>
          Today
        </Text>
        <Text
          style={{
            color: Colors.white,
            fontSize: DIM.deviceHeight * 0.02,
          }}>
          {current.format('MMM DD,YYYY')}
        </Text>
      </View>
      <View>
        {weatherHistory &&
        weatherHistory.historical_weather &&
        weatherHistory.historical_weather.length > 0 ? (
          <FlatList
            data={weatherHistory.historical_weather}
            renderItem={({item, index}) => {
              return <RenderWeatherHistory item={item} index={index} />;
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: DIM.deviceHeight * 0.02,
              marginStart: DIM.deviceWidth * 0.04,
            }}
          />
        ) : null}
      </View>

      <View
        style={{
          marginTop: DIM.deviceHeight * 0.04,
          flex: 1,
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: DIM.deviceWidth * 0.055,
            marginHorizontal: DIM.deviceWidth * 0.06,
          }}>
          Next forecast
        </Text>
        {state.weatherForecast &&
        state.weatherForecast.daily_forecast &&
        state.weatherForecast.daily_forecast.length > 0 ? (
          <FlatList
            data={state.weatherForecast.daily_forecast}
            renderItem={({item, index}) => {
              return <RenderWeatherForecast item={item} index={index} />;
            }}
            style={{
              marginTop: DIM.deviceHeight * 0.02,
              marginHorizontal:DIM.deviceWidth*0.055
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
    </View>
  );
}

export default ForeCastScreen

const styles = StyleSheet.create({})