import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'

export default function GerenciarFaturamento({navigation}){

    return (
        
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.inputArea}>
                    <Text style={styles.title}>Gerencie seu faturamento aqui!</Text>
                </View>
                <Text style={styles.subTitle}>O que você deseja fazer?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Vendas de produtos e serviços',{nome: 'João'})} style={styles.button}>
                    <Ionicons name="fast-food-outline" color="a1a1a1" size={60} style={styles.icon}/>
                    <Text style={styles.text}>Vendas de produtos e serviços</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Vendas a prazo',{nome: 'João'})} style={styles.button}>
                    <Ionicons name="time-outline" color="a1a1a1" size={60} style={styles.icon}/>
                    <Text style={styles.text}>Vendas a prazo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Estoque',{nome: 'João'})} style={styles.button}>
                    <Ionicons name="file-tray-full-outline" color="a1a1a1" size={60} style={styles.icon}/>
                    <Text style={styles.text}>Estoque</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
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
    },
    button: {
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: "#0022",
        margin: 10,
        padding: 10,
        width: 320,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0.5
    },
    inputArea:{
        flexDirection: 'row',
        width: '100%',
        paddingTop: 20,
    },
    icon:{
        paddingLeft: 20,
    },
    text:{
        color:"#E0FFFF",
        paddingLeft: 20,
        fontWeight: '900',
        fontSize: 16,
        width: '70%'
    }
});