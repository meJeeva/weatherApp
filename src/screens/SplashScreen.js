import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, DIM } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

    const navigation = useNavigation()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.blue,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/splashImg.png')}
          style={{
            height: DIM.deviceHeight * 0.35,
            width: DIM.deviceHeight * 0.35,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: Colors.white,
            textAlign: 'center',
            fontSize: DIM.deviceHeight * 0.04,
            fontWeight: '400',
          }}>
          Weather{' '}
          <Text
            style={{
              color: Colors.yellow,
            }}>
            News {`\n& Feed`}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: DIM.deviceHeight * 0.02,
            color: Colors.white,
            textAlign: 'center',
            marginVertical: DIM.deviceHeight * 0.02,
            lineHeight: 30,
          }}>
          Your daily weather companion! Stay informed, updates at your
          fingertips!
        </Text>

        <TouchableOpacity
          onPress={() => navigation.replace('BottomTabNavigation')}
          style={{
            backgroundColor: Colors.yellow,
            padding: DIM.deviceHeight * 0.02,
            borderRadius: 10,
            marginHorizontal: 'auto',
            width: DIM.deviceWidth * 0.7,
            marginTop: DIM.deviceHeight * 0.04,
          }}>
          <Text
            style={{
              fontSize: DIM.deviceHeight * 0.023,
              fontWeight: '600',
              color: Colors.black,
              textAlign: 'center',
            }}>
            Get Start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SplashScreen

const styles = StyleSheet.create({})