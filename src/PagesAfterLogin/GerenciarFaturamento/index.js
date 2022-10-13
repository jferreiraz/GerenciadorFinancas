import { View, Text, StyleSheet, SafeAreaView, Platform, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function GerenciarFaturamento({navigation}){

    return (
        
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.inputArea}>
                    <Text style={styles.title}> Gerencie seu faturamento aqui!</Text>
                </View>
                <Text style={styles.subTitle}>O que você deseja fazer?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Vendas de produtos e serviços',{nome: 'João'})} style={styles.button}><Text>Vendas de produtos e serviços</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Vendas a prazo',{nome: 'João'})} style={styles.button}><Text>Vendas a prazo</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Estoque',{nome: 'João'})} style={styles.button}><Text>Estoque</Text></TouchableOpacity>
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
        paddingTop: 20,
    },
    icon:{
        paddingLeft: 20,
    }
});