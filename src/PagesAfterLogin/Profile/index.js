import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { doc, setDoc } from "firebase/firestore";
//import React, { useState, useEffect } from "react";
import { dbacess } from "../../config";
import { collection, query, getDocs } from "firebase/firestore";
import { firebase } from "../../config"
import { getAuth, onAuthStateChanged } from "firebase/auth";

import * as Animatable from 'react-native-animatable'


export default function Register() {
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);

    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        //email: "",
        //password: "",
    });

    const handleChange = (value, name) => {
        setDetails({
            ...details,
            [name]: value,
        });
    };

    const handleSubmit = async () => {

        const q = query(collection(dbacess, "usuarios"));
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((detail) => ({
            ...detail.data(),
            id: detail.id,
        }));
        console.log(queryData);
        queryData.map(async (v) => {
            await setDoc(doc(dbacess, "usuarios", firebase.auth().currentUser.uid), {
                firstName: details.firstName,
                lastName: details.lastName,
                email: firebase.auth().currentUser.email
                //telefone: details.telefone
            });
        })
    };

    return(
        <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={50}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}> Perfil do usuário</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}> Alterar nome: </Text>
                <TextInput                 
                id="firstName"
                value={details.firstName}
                onChangeText={(value) => handleChange(value, "firstName")}
                name="fistName" 
                placeholder="Digite seu nome..." 
                style={styles.input} />

                <Text style={styles.title}> Alterar sobrenome: </Text>
                <TextInput
                id="lastName"
                value={details.lastName}
                onChangeText={(value) => handleChange(value, "lastName")}
                name="lastName" 
                placeholder="Digite seu sobrenome..." 
                style={styles.input} />

                <Text style={styles.title}> Alterar telefone: </Text>
                <View style={styles.inputArea}>
                    <TextInput placeholder="Digite uma senha...(não funcional no momento)" style={styles.inputPassword} secureTextEntry={hidePass} />
                    <TouchableOpacity onPress={ () => setHidePass(!hidePass) }>
                            <Ionicons name="eye" color="a1a1a1" size={25} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
                    <Text style={styles.buttonText}>Alterar</Text>
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