import { View, Text, StyleSheet, SafeAreaView, Platform, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'

export default function GerenciarCustos({navigation}){
    return (
        
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.inputArea}>
                    <Text style={styles.title}>Gerencie seus custos aqui, escolha abaixo qual custo deseja adicionar ou modificar!</Text>
                    <TouchableOpacity onPress={ () => navigation.navigate('Profile') }>
                        <Ionicons name="person-circle-outline" color="a1a1a1" size={30} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subTitle}>O que você deseja fazer?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Investimento fixo',{nome: 'João'})} style={styles.button}><Text>Investimento fixo</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Custo fixo',{nome: 'João'})} style={styles.button}><Text>Custo fixo</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Custos com mão de obra',{nome: 'João'})} style={styles.button}><Text>Custos com mão de obra</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Custos variáveis',{nome: 'João'})} style={styles.button}><Text>Custos variáveis</Text></TouchableOpacity>
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
        fontSize: 20,
        fontWeight: "500",
        color: "344422",
        textAlign: 'justify',
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