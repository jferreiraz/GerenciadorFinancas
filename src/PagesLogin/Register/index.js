import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../config';
import { firebase } from "../../config";

import * as Animatable from 'react-native-animatable'

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);

    const registerUser = async (email, password, firstName, lastName) => {



        if (email == "" | password == "" | firstName == "" | lastName == "") {
            Alert.alert("Um/ou mais campos vazios", "Cetifique-se de preencher todos os campos")
        } else {
            if (password.length < 6){
                Alert.alert("Senha inválida","Sua senha deve ter no mínimo 6 dígitos")
            }else{
            if (password != confirmPassword) {
                Alert.alert("Confirmação de senha", "A confirmação de senha foi digitada incorretamente, certifique-se de que ambas as senhas sejam iguais.")
            } else {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        firebase.auth().currentUser.sendEmailVerification({
                            handleCodeInApp: true,
                            url: 'https://financemanager-ef65d.firebaseapp.com',
                        })
                            .then(() => {
                                alert("Email enviado confirmando registro")
                                navigation.navigate('SignIn')
                            }).catch((error) => {
                                alert(error.message) //0%
                            })
                            .then(() => {
                                firebase.firestore().collection('usuarios')
                                    .doc(firebase.auth().currentUser.uid)
                                    .set({
                                        firstName,
                                        lastName,
                                        email,
                                    })
                            })
                            .catch((error) => {
                                //alert(error.message) //Problema no firebase
                                alert("Banco de dados se encontra offline no momento")
                            })
                    })
                    .catch((error) => {
                        //alert(error.message) //Email inválido ou vazio
                        alert("Email inválido")
                    })
            }}
        }



    }
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container} keyboardVerticalOffset='50'>
            <ScrollView>
                <Animatable.View animation="fadeInUp" delay={500} style={styles.containerHeader}>
                    <Text style={styles.message}> Realize seu cadastro!</Text>
                    <Text style={styles.description}> Complete os campos abaixo </Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                    <Text style={styles.title}> Primeiro Nome: </Text>
                    <TextInput
                        placeholder="Digite seu nome..."
                        style={styles.input}
                        onChangeText={(firstName) => setFirstName(firstName.trim())}
                        autoCorrect={false} />
                    <Text style={styles.title}> Sobrenome: </Text>
                    <TextInput
                        placeholder="Digite seu sobrenome..."
                        style={styles.input}
                        onChangeText={(lastName) => setLastName(lastName.trim())}
                        autoCorrect={false} />

                    <Text style={styles.title}> Email: </Text>
                    <TextInput
                        placeholder="Digite seu email..."
                        style={styles.input}
                        onChangeText={(email) => setEmail(email.trim())}
                        autoCorrect={false} />

                    <Text style={styles.title}> Senha: </Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            placeholder="Digite uma senha..."
                            style={styles.inputPassword}
                            secureTextEntry={hidePass}
                            onChangeText={(password) => setPassword(password)}
                            autoCorrect={false}
                            autoCapitalize="none" />

                        <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                            <Ionicons name="eye" color="a1a1a1" size={25} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}> Confirmar senha: </Text>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={50} style={styles.inputArea}>
                        <TextInput
                            placeholder="Confirme sua senha..."
                            style={styles.inputPassword}
                            secureTextEntry={hidePass}
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            autoCorrect={false}
                            autoCapitalize="none" />
                        <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                            <Ionicons name="eye" color="a1a1a1" size={25} />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => registerUser(email, password, firstName, lastName)}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.registerText}>Realize seu login aqui </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('ForgetPassword')}>
                        <Text style={styles.registerText}>Esqueceu sua senha? </Text>
                    </TouchableOpacity>


                </Animatable.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5CC6BA'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm: {
        backgroundColor: '#FFF',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        width: '98%'
    },
    inputPassword: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        width: '90%'
    },
    button: {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
        marginBottom: 10
    },
    registerText: {
        color: '#1212a1',
        fontSize: 16
    },
    description: {
        color: '#dcdcdc',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 4
    },
    inputArea: {
        flexDirection: 'row',
        width: '100%'
    }
})