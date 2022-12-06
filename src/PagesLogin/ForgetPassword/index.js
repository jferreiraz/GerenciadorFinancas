import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { firebase } from "../../config"

import * as Animatable from 'react-native-animatable'

export default function ForgetPassword() {
    const [email, setEmail] = useState('')

    const navigation= useNavigation();

    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Email enviado, confira na caixa de spam se o email foi recebido!")
        }).catch((error) => {
            alert(error)
        })
    }

    return(
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Esqueceu sua senha?</Text>
                <Text style={styles.description}>Recupere utilizando o email de registro </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={1300} style={styles.containerForm}>
                <Text style={styles.title}> Email: </Text>
                <TextInput 
                    onChangeText={(email) => setEmail(email.trim())}
                    autoCapitalize="none"
                    autoCorrect={false} 
                    placeholder="Digite seu email..." 
                    style={styles.input} />

                <TouchableOpacity onPress={() => forgetPassword()} style={styles.button}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.registerText}>Realize seu login aqui </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Crie uma conta gratuitamente, {'\n'}clique aqui!</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#5CC6BA'
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
        fontSize: 16,
        justifyContent: 'center',
        textAlign: 'center',
    },
    description:{
        color: '#dcdcdc',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 4
    }
})