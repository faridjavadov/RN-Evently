import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../../../redux/store/store'
import { changeLanguage, changeLoginStatus, changeTheme } from '../../../redux/slices/SettingsSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SettingsScreen = () => {


    const dispatch = useDispatch<AppDispatch>();
    const { language, theme } = useSelector((state: StateType) => state.SettingsSlice)

    const changetheme = async (Theme: string) => {
        dispatch(changeTheme(Theme))
        console.log(Theme);
        await AsyncStorage.setItem('ActiveTheme', JSON.stringify(Theme))

    }
    const Logout = async () => {
        await AsyncStorage.removeItem('loginStatus')
        dispatch(changeLoginStatus(false))
    }
    return (

        <View style={[styles.container, { backgroundColor: theme == 'light' ? '#F9FAEA' : '#000000', }]}>

            <Image style={styles.logoimage} source={require('../../../assets/logo/Logo.png')} />

            <View style={styles.settings}>
                <Text style={[styles.settingsmaintext, { color: theme == 'light' ? 'black' : 'white', borderBottomColor: theme == 'light' ? 'black' : 'white' }]}>Display Settings</Text>
                <TouchableOpacity onPress={() => changetheme('dark')}>
                    <Text style={[styles.settingstext, { backgroundColor: theme == 'dark' ? '#D4C4C7' : '#E7DFD8' }]}>Dark Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changetheme('light')}>

                    <Text style={[styles.settingstext, { backgroundColor: theme == 'light' ? '#D4C4C7' : '#E7DFD8' }]}>Light Mode</Text>
                </TouchableOpacity>

                <Text style={[styles.settingsmaintext, { color: theme == 'light' ? 'black' : 'white', borderBottomColor: theme == 'light' ? 'black' : 'white' }]}>Language Settings</Text>

                <View style={[styles.langaugecontainer, { backgroundColor: language == 'English' ? '#D4C4C7' : '#E7DFD8' }]}>
                    <Image style={styles.languagelogo} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Great_Britain_%28English_version%29.png/640px-Flag_of_Great_Britain_%28English_version%29.png' }} />
                    <TouchableOpacity onPress={() => dispatch(changeLanguage('English'))}>
                        <Text
                            style={styles.settingstext}>English
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.langaugecontainer, { backgroundColor: language == 'Turkish' ? '#D4C4C7' : '#E7DFD8' }]}>
                    <Image style={styles.languagelogo} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/2560px-Flag_of_Turkey.svg.png' }} />
                    <TouchableOpacity onPress={() => dispatch(changeLanguage('Turkish'))}>
                        <Text
                            style={styles.settingstext}>Turkish
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={[styles.langaugecontainer, { backgroundColor: language == 'Azerbaijani' ? '#D4C4C7' : '#E7DFD8' }]}>
                    <Image style={styles.languagelogo} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Azerbaijan_Democtratic_Republic.PNG/800px-Flag_of_Azerbaijan_Democtratic_Republic.PNG' }} />
                    <TouchableOpacity onPress={() => dispatch(changeLanguage('Azerbaijani'))}>
                        <Text
                            style={styles.settingstext}>Azerbaijani
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.langaugecontainer, { backgroundColor: '#E7DFD8',position:'absolute',bottom:'10%',alignSelf:'center' }]}>
                <TouchableOpacity onPress={Logout}>
                    <Text
                        style={styles.settingstext}>Log Out
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAEA',

    },
    languagelogo: {
        resizeMode: 'contain',
        height: '70%',
        width: '15%',
        alignSelf: 'center',
        borderRadius: 12
    },
    langaugecontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 370,
        borderRadius: 16
    },

    logoimage: {
        resizeMode: 'contain',
        height: '10%',
        alignSelf: 'center'
    },
    settings: {
        gap: 10,
        alignItems: 'center'
    },
    settingsmaintext: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    settingstext: {
        fontSize: 20,
        color: 'black',
        fontWeight: '400',

        padding: 10,
        width: 300,
        borderRadius: 16
    },
})