import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screens/main/home/HomeScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DetailsScreen from '../../screens/main/home/DetailsScreen'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name = 'PlacesDetails' component={DetailsScreen}/>
        </Stack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})