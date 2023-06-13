import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from '../stack/HomeStack';
import SettingsScreen from '../../screens/main/settings/SettingsScreen';
import ProfileScreen from '../../screens/main/profile/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SavedScreen from '../../screens/main/saved/SavedScreen';
import SearchScreen from '../../screens/main/search/SearchScreen';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store/store';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const {theme} = useSelector((state:StateType)=>state.SettingsSlice) 
  return (
    <Tab.Navigator initialRouteName='HomeStack' screenOptions={{
      
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: '8%',
        backgroundColor:  theme=='light'? '#F9FAEA':'black',
        opacity:1,
        borderTopWidth: 0,
        margin: 10,
        borderRadius: 14,
        position: 'absolute',
      }
    }}>

     
      <Tab.Screen name='ProfileScreen' component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View >
                <AntDesign name='profile' size={25} color={focused ? (theme=='light'?'black':'white') : 'gray'}  />
              </View>
            )
          }
        }} />
          <Tab.Screen name='SearchScreen' component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View >
                <Ionicons name='search-outline' size={25} color={focused ? (theme=='light'?'black':'white') : 'gray'} />
              </View>
            )
          }
        }} />

         <Tab.Screen name='HomeStack' component={HomeStack} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View >
              <Image style={{tintColor:focused?'#F68EAD':'#F68EAD80'}} source={require('../../assets/icons/Vector.png')} />
            </View>
          )
        }
      }} />
      <Tab.Screen name='SavedScreen' component={SavedScreen} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View >
              <MaterialIcons name='favorite-outline' size={25} color={focused ? (theme=='light'?'black':'white') : 'gray'}  />
            </View>
          )
        }
      }} />
      <Tab.Screen name='SettingsScreen' component={SettingsScreen} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View >
              <Ionicons name='settings-outline' size={25} color={focused ? (theme=='light'?'black':'white') : 'gray'}  />
            </View>
          )
        }
      }} />
    </Tab.Navigator>

  )
}

export default TabNavigation

const styles = StyleSheet.create({})