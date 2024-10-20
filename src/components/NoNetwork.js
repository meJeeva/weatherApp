import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, DIM } from '../utils/constants'
import noInternet from '../assets/noNetWork.png'

const NoNetwork = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.darkBlue,
        alignItems: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          color: Colors.white,
          marginTop: DIM.deviceHeight * 0.07,
          fontSize: DIM.deviceHeight * 0.025,
        }}>
        No internet connection
      </Text>
      <Image
        source={noInternet}
        style={{
          height: DIM.deviceHeight * 0.4,
          width: DIM.deviceHeight * 0.4,
          marginVertical:DIM.deviceHeight*0.06
        }}
      />
      <Text
        style={{
          color: Colors.white,
          marginTop: DIM.deviceHeight * 0.02,
          textAlign: 'center',
          lineHeight: DIM.deviceHeight * 0.025,
          fontSize: DIM.deviceHeight * 0.018,
        }}>{`Please check your connection \n again, or connect to wi-fi`}</Text>
    </View>
  );
}

export default NoNetwork

const styles = StyleSheet.create({})