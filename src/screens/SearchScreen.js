import {
  Alert,
  Image,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, DIM} from '../utils/constants';
import searchIcon from '../assets/searchIcon.png';
import locationIcon from '../assets/locationIcon.png';
import noData from '../assets/noData.png';
import {
  getAddressFromLatLongApi,
  getCurrentWeatherApi,
} from '../api/WeatherApi';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import sunnyIcon from '../assets/sunnyIcon.png';
import foggyIcon from '../assets/foggyIcon.png';
import rainyIcon from '../assets/rainyIcon.png';
import AndroidOpenSettings from 'react-native-android-open-settings';

const SearchScreen = () => {
  const [input, setInput] = useState('');
  const [location, setLocation] = useState(null);
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [address, setAddress] = useState('');
  const inputRef = useRef(null);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              console.log('Location:', latitude, longitude);
              setLocation({latitude, longitude});
              getAddressFromCoordinates(latitude, longitude);
            },
            error => {
              console.log('Error getting location:', error);
              if (error.code === 2) {
                Alert.alert(
                  'Location services are disabled',
                  'Please enable location services to get your location.',
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Enable GPS',
                      onPress: () =>
                        AndroidOpenSettings.locationSourceSettings(),
                    },
                  ],
                );
              } else {
                console.log('Location error:', error.message);
              }
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        } else {
          // Permission denied
          ToastAndroid.show('Location permission denied', ToastAndroid.LONG);
        }
      }
    } catch (err) {
      console.warn(err); // Catch and log errors
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await getAddressFromLatLongApi(latitude, longitude);
      console.log('response', response);
      setAddress(response);
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to retrieve address');
    }
  };

  const getCurrentWeather = async () => {
    try {
      const response = await getCurrentWeatherApi(input);
      if (response?.error) {
        return Toast.show({
          type: 'error',
          text1: response?.error?.message || 'No data available',
          position: 'bottom',
        });
      }
      console.log('response', response);
      if (response) {
        setCurrentLocationData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherCondition = weather => {
    let condition = 'Sunny';
    if (weather) {
      const weatherText = weather.current?.condition.text.toLowerCase();

      if (weatherText.includes('rain')) {
        condition = 'Rainy';
      } else if (weatherText.includes('cloud')) {
        condition = 'Cloudy';
      } else if (
        weatherText.includes('sunny') ||
        weatherText.includes('clear')
      ) {
        condition = 'Sunny';
      } else {
        condition = 'Sunny';
      }
    }
    return condition;
  };

  const getWeatherBasedImg = () => {
    return getWeatherCondition(currentLocationData).toLowerCase() === 'sunny'
      ? sunnyIcon
      : getWeatherCondition(currentLocationData).toLowerCase() === 'rainy'
      ? rainyIcon
      : getWeatherCondition(currentLocationData).toLowerCase() === 'cloudy'
      ? foggyIcon
      : sunnyIcon;
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
        Pick Location
      </Text>
      <Text
        style={{
          color: Colors.white,
          textAlign: 'center',
          marginTop: DIM.deviceHeight * 0.02,
          lineHeight: DIM.deviceHeight * 0.03,
          fontSize: DIM.deviceHeight * 0.017,
        }}>{`Find the area or city that you want to know\n the weather info at this time`}</Text>

      <View
        style={{
          marginHorizontal: DIM.deviceWidth * 0.06,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: DIM.deviceHeight * 0.04,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: Colors.darkBlue,
              padding: DIM.deviceHeight * 0.007,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              flex: 0.88,
            }}>
            <Pressable onPress={() => inputRef.current.focus()}>
              <Image
                source={searchIcon}
                style={{
                  height: DIM.deviceHeight * 0.03,
                  width: DIM.deviceHeight * 0.03,
                  tintColor: Colors.white,
                  marginHorizontal: DIM.deviceWidth * 0.04,
                }}
              />
            </Pressable>
            <TextInput
              ref={inputRef}
              value={input}
              onChangeText={setInput}
              placeholder="Search ( pincode, city name..)"
              placeholderTextColor={Colors.grey}
              style={{
                color: Colors.white,
                flex: 1,
              }}
              onBlur={() => {
                if (!input) return setCurrentLocationData(null);
                getCurrentWeather(input);
              }}
            />
          </View>
          <TouchableOpacity
            onPress={requestLocationPermission}
            style={{
              backgroundColor: Colors.darkBlue,
              padding: DIM.deviceHeight * 0.02,
              borderRadius: 15,
              flex: 0.07,
            }}>
            <Image
              source={locationIcon}
              style={{
                height: DIM.deviceHeight * 0.025,
                width: DIM.deviceHeight * 0.025,
                tintColor: Colors.white,
              }}
            />
          </TouchableOpacity>
        </View>
        {currentLocationData ? (
          <View
            style={{
              backgroundColor: Colors.skyBlue,
              padding: DIM.deviceHeight * 0.02,
              margin: DIM.deviceHeight * 0.01,
              borderRadius: 20,
              elevation: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: DIM.deviceHeight * 0.055,
                      textAlign: 'center',
                    }}>
                    {currentLocationData?.current?.temp_f}°
                  </Text>
                  <Text
                    style={{
                      fontSize: DIM.deviceHeight * 0.015,
                      color: Colors.white,
                    }}>
                    F
                  </Text>
                </View>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: DIM.deviceHeight * 0.02,
                  }}>
                  {getWeatherCondition(currentLocationData) || 'Sunny'}
                </Text>
              </View>
              <Image
                source={getWeatherBasedImg()}
                style={{
                  height: DIM.deviceHeight * 0.12,
                  width: DIM.deviceHeight * 0.12,
                  marginEnd: DIM.deviceWidth * 0.02,
                }}
              />
            </View>
            <Text
              style={{
                marginTop: DIM.deviceHeight * 0.02,
                marginBottom: DIM.deviceHeight * 0.01,
                fontSize: DIM.deviceHeight * 0.02,
                color: Colors.white,
              }}>
              {currentLocationData?.location?.name},{' '}
              {currentLocationData?.location?.region}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Image
              source={noData}
              style={{
                height: DIM.deviceHeight * 0.4,
                width: DIM.deviceHeight * 0.4,
                backgroundColor: Colors.blue,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
