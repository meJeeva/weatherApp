import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, DIM, WeatherImg } from '../utils/constants';
import moment from 'moment-timezone'; 


const RenderWeatherHistory = ({item,index}) => {
  return (
    <View
      style={{
        backgroundColor: index === 0 ? Colors.skyBlue : Colors.darkBlue,
        borderRadius: 20,
        margin: DIM.deviceHeight * 0.01,
        padding: DIM.deviceHeight * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
        height: DIM.deviceHeight * 0.1,
        paddingHorizontal: DIM.deviceWidth * 0.055,
        elevation: 5,
      }}
      key={index}>
      <Image
        source={WeatherImg(item)}
        style={{
          height: DIM.deviceHeight * 0.05,
          width: DIM.deviceHeight * 0.05,
        }}
      />
      <View
        style={{
          marginStart: DIM.deviceWidth * 0.05,
        }}>
        <Text
          style={{
            color: Colors.white,
            fontWeight: '500',
            fontSize: DIM.deviceHeight * 0.019,
          }}>
          {item.timestamp ? moment(item.timestamp).format('hh.mm') : ''}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Colors.white,
              fontSize: DIM.deviceHeight * 0.025,
            }}>
            {item.temperature}°
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
    </View>
  );
}

export default RenderWeatherHistory

const styles = StyleSheet.create({})