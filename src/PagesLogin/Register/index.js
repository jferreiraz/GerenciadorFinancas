import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import * as Animatable from 'react-native-animatable'


export default function Register() {
    const navigation= useNavigation();
    const [hidePass, setHidePass] = useState(true);

    return(
        <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={50}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}> Realize seu cadastro!</Text>
                <Text style={styles.description}> Complete os campos abaixo </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}> Nome: </Text>
                <TextInput placeholder="Digite seu nome..." style={styles.input} />

                <Text style={styles.title}> Email: </Text>
                <TextInput placeholder="Digite seu email..." style={styles.input} />

                <Text style={styles.title}> Senha: </Text>
                <View style={styles.inputArea}>
                    <TextInput placeholder="Digite uma senha..." style={styles.inputPassword} secureTextEntry={hidePass} />
                    <TouchableOpacity onPress={ () => setHidePass(!hidePass) }>
                            <Ionicons name="eye" color="a1a1a1" size={25} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}> Confirmar senha: </Text>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={50} style={styles.inputArea}>
                    <TextInput placeholder="Confirme sua senha..." style={styles.inputPassword} secureTextEntry={hidePass} />
                    <TouchableOpacity onPress={ () => setHidePass(!hidePass) }>
                            <Ionicons name="eye" color="a1a1a1" size={25} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.registerText}>Realize seu login aqui </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.registerText}>Esqueceu sua senha? </Text>
                </TouchableOpacity>


            </Animatable.View>

        </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#38a69d'
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm:{
        backgroundColor: '#FFF',
        flex:1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title:{
        fontSize: 20,
        marginTop: 28,
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        width: '98%'
    },
    inputPassword:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        width: '90%'
    },
    button:{
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    buttonText:{
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister:{
        marginTop: 14,
        alignSelf: 'center',
        marginBottom: 10
    },
    registerText:{
        color:'#1212a1',
        fontSize: 16
    },
    description:{
        color: '#dcdcdc',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 4
    },
    inputArea:{
        flexDirection: 'row',
        width: '100%'
    }
})