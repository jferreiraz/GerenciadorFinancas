import { View, Text, StyleSheet, SafeAreaView, Platform, ScrollView, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'




export default function GerenciarCustos({ navigation }) {
    return (

        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.inputArea}>
                    <Text style={styles.title}>Gerencie seus custos aqui, escolha abaixo qual opção deseja adicionar ou modificar!</Text>
                </View>
                <Text style={styles.subTitle}>O que você deseja fazer?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Investimento fixo', { nome: 'João' })} style={styles.button}>
                    <Ionicons name="cellular-outline" color="a1a1a1" size={60} style={styles.icon} />
                    <Text style={styles.text}>Investimento fixo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Custo fixo', { nome: 'João' })} style={styles.button}>
                    <Ionicons name="calendar-outline" color="a1a1a1" size={60} style={styles.icon} />
                    <Text style={styles.text}>Custo fixo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Custos com mão de obra', { nome: 'João' })} style={styles.button}>
                    <Ionicons name="construct-outline" color="a1a1a1" size={60} style={styles.icon} />
                    <Text style={styles.text}>Custos com mão de obra</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Custos variáveis', { nome: 'João' })} style={styles.button}>
                    <Ionicons name="calculator-outline" color="a1a1a1" size={60} style={styles.icon} />
                    <Text style={styles.text}>Custos variáveis</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Teste', { nome: 'João' })} style={styles.button}>
                    <Ionicons name="layers-outline" color="a1a1a1" size={60} style={styles.icon} />
                    <Text style={styles.text}>Teste</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Teste2')} style={styles.button}>
                    <Ionicons name="layers-outline" color="a1a1a1" size={60} style={styles.icon} />
                    <Text style={styles.text}>Teste</Text>
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
        paddingHorizontal: 20,
        paddingTop: Platform.OS == 'android' ? 50 : 0
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        color: "344422",
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "400",
        color: "300022",
        paddingTop: 12,
        paddingBottom: 20,
        paddingHorizontal: 0
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
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 0,
    },
    icon: {
        paddingLeft: 20,
    },
    text: {
        color: "#E0FFFF",
        paddingLeft: 30,
        fontWeight: 'bold',
        fontSize: 16,
        width: '60%',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    }
});