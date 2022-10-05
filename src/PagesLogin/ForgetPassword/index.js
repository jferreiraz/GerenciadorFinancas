import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable'

export default function ForgetPassword() {
    const navigation= useNavigation();

    return(
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}> Esqueceu sua senha?</Text>
                <Text style={styles.description}> Preencha com seu email o campo abaixo </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={1300} style={styles.containerForm}>
                <Text style={styles.title}> Email: </Text>
                <TextInput placeholder="Digite seu email..." style={styles.input} />

                <TouchableOpacity onPress={() => alert('Um email solicitando alteração de senha foi enviado, verifique seu gmail!')} style={styles.button}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.registerText}>Realize seu login aqui </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Crie uma conta gratuitamente, clique aqui!</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
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
        fontSize: 16
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
    }
})