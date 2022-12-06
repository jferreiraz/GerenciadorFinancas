import { View, Text, StyleSheet, SafeAreaView, Platform, ScrollView, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'

export default function GerenciarCustos({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.subText}>Gastos mensais</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Custo fixo')} style={styles.button}>
                        <Ionicons name="calendar-outline" color="a1a1a1" size={30} style={styles.icon} />
                        <Text style={styles.text}>Custo fixo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Custos com mão de obra')} style={styles.button}>
                        <Ionicons name="construct-outline" color="a1a1a1" size={30} style={styles.icon} />
                        <Text style={styles.text}>Custos com mão de obra</Text>
                    </TouchableOpacity>
                </View>
                </SafeAreaView>
                <SafeAreaView style={styles.headerContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.subText}>Gastos inconstantes</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Custos variáveis')} style={styles.button}>
                        <Ionicons name="calculator-outline" color="a1a1a1" size={30} style={styles.icon} />
                        <Text style={styles.text}>Custos variáveis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Investimento fixo')} style={styles.button}>
                        <Ionicons name="cellular-outline" color="a1a1a1" size={30} style={styles.icon} />
                        <Text style={styles.text}>Investimento fixo</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        borderBottomWidth: 0.19,
        borderBottomColor: "gray",
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
        borderRadius: 3,
        backgroundColor: "#F5F0F5",
        margin: 10,
        padding: 10,
        width: 320,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0.1,
        borderColor: 'gray',
    },
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 0,
    },
    icon: {
        paddingLeft: 0,
        color: "#5C5C5C"
    },
    text: {
        color: "black",
        paddingLeft: 30,
        fontWeight: '300',
        fontSize: 16,
        width: '60%',
    },
    subText: {
        color: "black",
        paddingLeft: 15,
        paddingBottom: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonContainer: {
        borderWidth: 1,
        borderBottomWidth: 0,
        marginHorizontal: 15,
        marginTop: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    subContainer:{
        marginBottom: 30,
    },
});