import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { StateType, store } from './src/redux/store/store'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './src/navigation/tab/TabNavigation'
import LoginScreen from './src/screens/onboarding/login/LoginScreen'
import Opening from './src/screens/Opening'
import SplashScreen from 'react-native-splash-screen'




const App = () => {

    
  

  return (
    <Provider store={store}>
      <NavigationContainer>

        <Opening />

      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})