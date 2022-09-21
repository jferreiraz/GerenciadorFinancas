import { View, Text, StyleSheet, SafeAreaView, Platform, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SelectBox from 'react-native-multi-selectbox'
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'


export default function Home({navigation}){


    return (
        
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.inputArea}>
                    <Text style={styles.title}> Bem-vindo de volta fulano!</Text>
                    <TouchableOpacity onPress={ () => navigation.navigate('Profile') }>
                        <Ionicons name="person-circle-outline" color="a1a1a1" size={30} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subTitle}>O que você deseja fazer?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Finanças',{nome: 'João'})} style={styles.button}><Text>Gerenciar custos</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Faturamento',{nome: 'João'})} style={styles.button}><Text>Gerenciar faturamento</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('DRE',{nome: 'João'})} style={styles.button}><Text>Gerar DRE</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Informação',{nome: 'João'})} style={styles.button}><Text>Tutorial</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}



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
    },
    icon:{
        paddingLeft: 20,
    }
});