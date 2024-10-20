import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/Store'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './src/navigation/StackNavigation'
import Toast from 'react-native-toast-message'
import NetInfo from '@react-native-community/netinfo';
import NoNetwork from './src/components/NoNetwork'

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isConnected ? <StackNavigation /> :  <NoNetwork />}
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

export default App

const styles = StyleSheet.create({})