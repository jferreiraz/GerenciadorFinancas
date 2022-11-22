import { View, Text, StyleSheet, SafeAreaView, Platform, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SelectBox from 'react-native-multi-selectbox'
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { firebase } from "../../config"
//import { snapshot } from "firebase/auth"
//import { BackHandler } from 'react-native';
import { Alert } from "react-native";


const Home = ({navigation}) => {
    const [name, setName] = useState ('')

    useEffect(() => {
        firebase.firestore().collection('usuarios')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                //alert("Token desse email: \n\n"+firebase.auth().currentUser.uid)
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
                    <Text style={styles.title}>Bem-vindo de volta {name.firstName} {name.lastName}!</Text>
                <Text style={styles.subTitle}>O que você deseja fazer hoje?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Gerenciar Custos')} style={styles.button}>
                    <Ionicons name="reader-outline" color="a1a1a1" size={50} style={styles.icon}/>
                    <Text style={styles.text}>Gerenciar custos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Gerenciar Faturamento')} style={styles.button}>
                    <Ionicons name="trending-up-outline" color="a1a1a1" size={50} style={styles.icon}/>
                    <Text style={styles.text}>Gerenciar faturamento</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('DRE')} style={styles.button}>
                    <Ionicons name="folder-open-outline" color='a1a1a1' size={50} style={styles.icon}/>
                    <Text style={styles.text}>Gerar DRE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Confirmação', 'Tem certeza que desejar encerrar a sessão?', [
          { text:'Sim', onPress: () => { navigation.navigate("SignIn") } },
          { text:'Não', onPress: () => {console.log('No Pressed ');}}
          ])} style={styles.buttonOut}>
                    <Ionicons name="exit-outline" color='a1a1a1' size={25} style={styles.icon}/>
                    <Text style={styles.textOut}>Encerrar Sessão</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "fff",
        justifyContent: 'space-between'
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
        fontSize: 18,
        fontWeight: "400",
        color: "#23316B",
        paddingTop: 12,
        paddingBottom: 20,
    },
    button: {
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: "#CAE6E6",
        margin: 10,
        padding: 10,
        width: 320,
        height: 80,
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'row',
    },
    inputArea:{
        flexDirection: 'row',
        width: '100%',
        paddingTop: 20,
    },
    icon:{
        paddingLeft: 20,
    },
    text: {
        color:"#23316B",
        paddingLeft: 30,
        fontWeight: '600',
        fontSize: 16
    },
    buttonOut: {
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "#EB7762",
        margin: 25,
        width: 220,
        height: 50,
        alignItems: 'center',
        borderWidth: 1.5,
        flexDirection: 'row',
    },
    textOut: {
        color:"black",
        padding: 10,
        fontWeight: '400',
        fontSize: 16
    },
});
