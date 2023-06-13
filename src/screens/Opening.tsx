import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../redux/store/store'
import TabNavigation from '../navigation/tab/TabNavigation'
import LoginScreen from './onboarding/login/LoginScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingComponent from '../components/Loading'
import { changeLanguage, changeLoginStatus, changeTheme } from '../redux/slices/SettingsSlice'


const Opening = () => {
    const [log, setlog] = useState(false)
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch<AppDispatch>();
    const { loginStatus } = useSelector((state: StateType) => state.SettingsSlice)
    const getStatus = async () => {
        try {
            const loginStatus = await AsyncStorage.getItem('loginStatus');
            if (loginStatus !== null) {
                dispatch(changeLoginStatus(JSON.parse(loginStatus)))
                setlog(JSON.parse(loginStatus));
                setloading(false);


            } else {
                setloading(false);

                return null;

            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    const getTheme = async () => {
        try {
            const activeTheme = await AsyncStorage.getItem('ActiveTheme');

            if (activeTheme !== null) {
                dispatch(changeTheme(JSON.parse(activeTheme)))
                setloading(false);

            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        getStatus();
        getTheme();
    }, [])
    //AsyncStorage.clear()

    // if (log == true) {
    //     return <TabNavigation />
    // }
    // else {
    if (loading) {
        return <LoadingComponent />
    }
    else {
        if (loginStatus) {
            return <TabNavigation />
        } else {
            return <LoginScreen />
        }

    }



    //}


}

export default Opening

const styles = StyleSheet.create({})