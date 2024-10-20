import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ForeCastScreen from '../screens/ForeCastScreen';
import { Colors, DIM } from '../utils/constants';
import homeIcon from '../assets/IconHome.png';
import searchIcon from '../assets/searchIcon.png';
import forecastIcon from '../assets/forecastIcon.png';


const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'HomeScreen') {
            iconSource = homeIcon;
          } else if (route.name === 'SearchScreen') {
            iconSource = searchIcon;
          } else if (route.name === 'ForeCastScreen') {
            iconSource = forecastIcon;
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.icon,
                { tintColor: focused ? Colors.yellow : Colors.white}
              ]}
            />
          );
        },
        tabBarShowLabel: false, 
        tabBarStyle: { backgroundColor: Colors.blue ,height:DIM.deviceHeight*0.07,borderWidth:0},
        headerShown: false, 
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="ForeCastScreen" component={ForeCastScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation

const styles = StyleSheet.create({
    icon : {
        height:DIM.deviceHeight*0.035,
        width:DIM.deviceHeight*0.035
    }
})