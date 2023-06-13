import { Alert, Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';

const RegisterModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('')

    const dispatch = useDispatch();


    const handleRegister = async () => {
        try {
            if (password == confirmPassword) {
                const item = {
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                }
                const response = await axios.post('http://172.16.0.105:8080/api/auth/registration', item)
                setModalVisible(false);
                setName('');
                setSurname('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                
                
            }
            else {
                seterrorMessage('password mismatch!')
            }


        } catch (error) {
            seterrorMessage('User couldnt created')
        }



    };
    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.registerbutton}>Register</Text>
            </TouchableOpacity>


            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#F9FAEA', gap: 20, borderRadius: 24 }}>

                        <Image style={styles.logoimage} source={require('../../assets/logo/Logo.png')} />

                        <Text style={{ fontSize: 30, color: '#D4C4C7', fontWeight: '700', alignSelf: 'center' }}>Registration</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Surname"
                            value={surname}
                            onChangeText={setSurname}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                        />
                        <Text style={{alignSelf:'center', color: '#FF9494', fontSize: 13 }}>{errorMessage}</Text>

                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={[styles.button, { backgroundColor: '#D4C4C7' }]}>    REGISTER   </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(false);
                            setName('');
                            setSurname('');
                            setEmail('');
                            setPassword('');
                            setConfirmPassword('');

                        }}>
                            <Text style={[styles.button, { backgroundColor: '#D4C4C7' }]}>CANCEL</Text>

                        </TouchableOpacity>


                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default RegisterModal

const styles = StyleSheet.create({
    logo: {
        alignItems: 'center'
    },
    logoimage: {
        resizeMode: 'contain',
        height: '20%',
        alignSelf: 'center'
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 12,
    },
    button: {
        alignSelf: 'center',
        padding: 4,
        paddingHorizontal: 20,
        borderRadius: 10,
        color: 'black'

    },
    registerbutton: {
        backgroundColor: '#D4C4C7',
        color: 'black',
        padding: '3%',
        paddingHorizontal: '13%',
        borderRadius: 24
    },
})