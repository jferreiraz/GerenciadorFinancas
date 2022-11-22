import { View, Text, StyleSheet, SafeAreaView, Platform, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SelectBox from 'react-native-multi-selectbox'
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { firebase } from "../../config"
//import { snapshot } from "firebase/auth"
//import { BackHandler } from 'react-native';


const Home = ({navigation}) => {
    const [name, setName] = useState ('')

    useEffect(() => {
        firebase.firestore().collection('usuarios')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                alert("Token desse email: \n\n"+firebase.auth().currentUser.uid)
                setName(snapshot.data()) 
            }
            else {
                console.log('User does not exist')
            }
        })
    }, [])

    return (
        
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.inputArea}>
                    <Text style={styles.title}> Bem-vindo de volta {name.firstName} {name.lastName}</Text>
                    <TouchableOpacity onPress={ () => navigation.navigate('Profile') }>
                        <Ionicons name="person-circle-outline" color="a1a1a1" size={30} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subTitle}>O que você deseja fazer?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Gerenciar Custos')} style={styles.button}><Text>Gerenciar custos</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Gerenciar Faturamento')} style={styles.button}><Text>Gerenciar faturamento</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('DRE')} style={styles.button}><Text>Gerar DRE</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "fff",
    },
    headerContainer: {
        padding: 20,
        paddingTop: Platform.OS == 'android' ? 50 : 0
    },
    title: {
        fontSize: 22,
        fontWeight: "500",
        color: "344422",
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "400",
        color: "300022",
        paddingTop: 12,
        paddingBottom: 20,
        paddingHorizontal: 6
    },
    button: {
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: "#0022",
        margin: 10,
        padding: 10,
        width: 300,
        alignItems: 'center'
    },
    inputArea:{
        flexDirection: 'row',
        width: '100%',
        paddingTop: 20,
    },
    icon:{
        paddingLeft: 20,
    }
});
