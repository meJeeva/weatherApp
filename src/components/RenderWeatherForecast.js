import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, DIM} from '../utils/constants';
import moment from 'moment';
import partlyIcon from '../assets/partlyIcon.png';
import foggyIcon from '../assets/foggyIcon.png';
import rainyIcon from '../assets/rainyIcon.png';
import snowIcon from '../assets/snowIcon.png';
import sunnyIcon from '../assets/sunnyIcon.png';

const RenderWeatherForecast = ({item, index}) => {
  const weatherImage = weather => {
    if (weather)
      return weather.toLowerCase() === 'cloudy'
        ? foggyIcon
        : weather.toLowerCase() === 'Clear'
        ? sunnyIcon
        : weather.toLowerCase() === 'partly cloudy'
        ? partlyIcon
        : sunnyIcon;
  };

  return (
    <View
      key={index}
      style={{
        backgroundColor: Colors.darkBlue,
        padding: DIM.deviceHeight * 0.02,
        margin: DIM.deviceHeight * 0.007,
        borderRadius: 20,
        marginVertical: DIM.deviceHeight * 0.013,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flex: 0.4,
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: DIM.deviceHeight * 0.02,
            fontWeight: '600',
          }}>
          {item.date ? moment(item.date).format('dddd') : ''}
        </Text>
        <Text
          style={{
            color: Colors.white,
            marginTop: DIM.deviceHeight * 0.007,
            fontSize: DIM.deviceHeight * 0.018,
          }}>
          {item.date ? moment(item.date).format('MMM, DD') : ''}
        </Text>
      </View>
      <View
        style={{
          flex: 0.35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Colors.white,
              fontSize: DIM.deviceHeight * 0.05,
              textAlign: 'center',
            }}>
            {item.max_temperature}°
          </Text>
          <Text
            style={{
              fontSize: DIM.deviceHeight * 0.015,
              color: Colors.white,
            }}>
            F
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.25,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={weatherImage(item?.weather_conditions)}
          style={{
            height: DIM.deviceHeight * 0.05,
            width: DIM.deviceHeight * 0.05,
          }}
        />
      </View>
    </View>
  );
};

export default RenderWeatherForecast;

const styles = StyleSheet.create({});
