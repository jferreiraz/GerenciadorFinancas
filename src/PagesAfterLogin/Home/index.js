import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SelectBox from 'react-native-multi-selectbox'
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { firebase } from "../../config"
//import { snapshot } from "firebase/auth"
//import { BackHandler } from 'react-native';
import { Alert } from "react-native";


import { StatusBar, BackHandler, Bar } from 'react-native';

import Routes from '../../routes';

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
        <ScrollView style={styles.container}>
            <SafeAreaView>
            <View style={styles.headerProfile}>
                <View style={styles.headerProfileContainer}>
                <Ionicons name="person-circle" color="a1a1a1" size={35} style={styles.icon}/>
                <Text style={styles.headerProfileText}>{name.firstName} {name.lastName}</Text>
                </View>
                <View>
                <Ionicons name="arrow-forward-outline" color="a1a1a1" size={25}/>
                </View>
            </View>
            <View style={styles.headerContainer}>
                <View style={styles.buttonFirstContainer}>
                <TouchableOpacity onPress={()=> navigation.navigate('Gerenciar Custos')} style={styles.button}>
                    <Ionicons name="reader-outline" color="a1a1a1" size={50} style={styles.icon}/>
                    <Text style={styles.text}>Gerenciar custos</Text>

                </TouchableOpacity>
                <Text style={styles.textContainer}>Gerencie todos os custos necessários. Investimento fixo, custo fixo, mão de obra e custos variáveis como cartão de crédito e débito.</Text>
                </View>

                <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=> navigation.navigate('Gerenciar Faturamento')} style={styles.button}>
                    <Ionicons name="trending-up-outline" color="a1a1a1" size={50} style={styles.icon}/>
                    <Text style={styles.text}>Gerenciar faturamento</Text>
                    
                </TouchableOpacity>
                <Text style={styles.textContainer}>Gerencie o faturamento, melhorando a organização e administração do seu capital. Vendas de produtos e serviços, vendas a prazo e estoque.</Text>
                </View>

                <View style={styles.buttonLastContainer}>
                <TouchableOpacity onPress={()=> navigation.navigate('DRE')} style={styles.button}>
                    <Ionicons name="folder-open-outline" color='a1a1a1' size={50} style={styles.icon}/>
                    <Text style={styles.text}>Gerar DRE</Text>
                    
                </TouchableOpacity>
                <Text style={styles.textContainer}>Gere uma demonstração do resultado do exercício, capaz de te proporcionar uma visão geral do seu fluxo de caixa por meio de um relatório contábil.</Text>
                </View>

                <TouchableOpacity onPress={() => Alert.alert('Confirmação', 'Tem certeza que desejar encerrar a sessão?', [
          { text:'Sim', onPress: () => { navigation.navigate("SignIn") } },
          { text:'Não', onPress: () => {console.log('No Pressed ');}}
          ])} style={styles.buttonOut}>
                    <Ionicons name="exit-outline" color='a1a1a1' size={25} style={styles.icon}/>
                    <Text style={styles.textOut}>Encerrar Sessão</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        //justifyContent: 'space-between'
    },
    headerProfile: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        //backgroundColor: '#CEFCFC',
        backgroundColor: '#FEF',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingRight: 5,
    },
    headerProfileContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        //backgroundColor: '#CEFCFC',
        backgroundColor: '#FEF',
        //borderBottomWidth: 1,
        paddingRight: 5,
    },
    headerProfileText:{
        fontSize: 18,
        paddingLeft: 5,
        fontWeight: '500',
    },
    headerContainer: {
        backgroundColor: '#FFF',
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
        backgroundColor: "#FFF",
        margin: 10,
        padding: 10,
        width: 320,
        height: 80,
        alignItems: 'center',
        borderWidth: 0,
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
        paddingLeft: 20,
        paddingRight: 10,
        fontWeight: '600',
        fontSize: 16
    },
    buttonOut: {
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "#FA765E",
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
    separation: {
        textAlign: "center"
    },
    buttonFirstContainer:{
        borderWidth:1,
        borderBottomWidth:0,
        marginHorizontal: 15,
        marginTop: 10,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    buttonContainer:{
        borderWidth:1,
        marginHorizontal: 15,
    },
    buttonLastContainer:{
        borderWidth:1,
        borderTopWidth:0,
        marginHorizontal: 15,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
    textContainer:{
        paddingHorizontal: 10,
        paddingBottom: 20,
        fontSize: 14,
        color: 'gray',
        textAlign: 'center'
    },
});
