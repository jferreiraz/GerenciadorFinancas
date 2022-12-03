import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebase } from '../../config';
import { Alert } from 'react-native';

import * as Animatable from 'react-native-animatable'
import { createNativeStackNavigator, NavigationContainer } from '@react-navigation/native-stack';

export const id123123 = 0

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //const app = initializeApp(firebaseConfig)
    //const auth = getAuth(app);

    const navigation= useNavigation();
    const [hidePass, setHidePass] = useState(true);

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            navigation.navigate('Home')
            //const token = firebase.auth().currentUser.getIdToken
            //alert('token: ',{token})
        } catch (error){
            Alert.alert("Aviso","Usuário e/ou senha inválidos, tente novamente.")
            //alert(error.message)
        }
    }

    return(
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}> Bem-vindo (a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}> Email </Text>
                <TextInput 
                    placeholder="Digite seu email..." style={styles.input}
                    onChangeText={(email) => setEmail(email.trim())}
                    autoCapitalize="none"
                    autoCorrect={false} 
                />
                <Text style={styles.title}> Senha </Text>

                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Digite sua senha..." 
                        onChangeText={(password) => setPassword(password)} 
                        style={styles.inputPassword}
                        autoCapitalize="none"
                        autoCorrect={false} 
                        secureTextEntry={hidePass}
                    />
                    <TouchableOpacity onPress={ () => setHidePass(!hidePass) }>
                        <Ionicons name="eye" color="a1a1a1" size={25} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}  onPress={() => loginUser(email, password)}          // onPress={() => navigation.navigate('Home')}> 
                >
                    <Text style={styles.buttonText}>Acessar</Text> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Crie uma conta gratuitamente, {'\n'}clique aqui!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.registerText}>Esqueceu sua senha? </Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}
    
export default SignIn

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
        width: '95%'
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
        marginTop: 25,
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
    inputArea:{
        flexDirection: 'row',
        width: '100%'
    }
})