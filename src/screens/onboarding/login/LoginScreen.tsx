import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { changeLoginStatus, getUserID } from '../../../redux/slices/SettingsSlice';
import { Alert } from 'react-native';
import RegisterModal from '../../../components/Modal/RegisterModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch<AppDispatch>();



    const Login = async () => {
        try {
            const response = await axios.post('http://172.16.0.105:8080/api/auth/login', {
                email: email,
                password: password,
            });
            if (response) {
                dispatch(changeLoginStatus(true));
                
                dispatch(getUserID(response.data))
                await AsyncStorage.setItem('loginStatus',JSON.stringify(true))
                
            }
        } catch (error) {

            setErrorMessage('Invalid email or password. Please try again.'); // Set error message for password mismatch
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.logoimage} source={require('../../../assets/logo/Logo.png')} />
            </View>
            <View style={styles.inputs}>
                <TextInput placeholder='email' style={styles.input} onChangeText={setemail} />
                <TextInput placeholder='password' style={styles.input} secureTextEntry={true} onChangeText={setpassword} />
                <View style={styles.logregbuttons}>
                    <TouchableOpacity onPress={Login}>
                        <Text style={styles.loginbutton}>Login</Text>
                    </TouchableOpacity>
                    <RegisterModal />
                </View>

                {

                    errorMessage ? <Text style={{ color: '#FF9494' }}>{errorMessage}</Text> : <Text></Text>
                }

                <TouchableOpacity>
                    <Text style={styles.passwordreset}>Did you forget your password?</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.additionallogins}>
                <TouchableOpacity style={styles.additionalloginsbuttons}>
                    <Image style={{ width: 32, height: 32 }} source={require('../../../assets/loginicons/Google.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.additionalloginsbuttons}>
                    <Image source={require('../../../assets/loginicons/Facbook.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.additionalloginsbuttons}>
                    <Image source={require('../../../assets/loginicons/Apple.png')} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAEA'
    },
    logo: {
        alignItems: 'center',
        marginTop: '20%'
    },
    logoimage: {

    },
    logregbuttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 30
    },
    input: {
        width: '90%',
        borderRadius: 24,
        backgroundColor: '#E7DFD8',
        paddingHorizontal: 20

    },
    inputs: {
        marginTop: '35%',
        alignItems: 'center',
        gap: 10
    },
    loginbutton: {
        backgroundColor: '#D4C4C7',
        color: 'black',
        padding: '3%',
        paddingHorizontal: '15%',
        borderRadius: 24
    },
    passwordreset: {
        borderBottomWidth: 0.8
    },
    additionallogins: {
        marginTop: '15%',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    additionalloginsbuttons: {
        padding: 10,
        backgroundColor: '#E7DFD8',
        borderRadius: 40
    },

})