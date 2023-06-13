import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
        <Image style={{alignSelf:'center',height:'80%',resizeMode:'contain'}} source={require('../../../assets/logo/Logo.png')}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F9FAEA'
    }
})