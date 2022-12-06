import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'

export default function GerenciarFaturamento({ navigation }) {

    return (

        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.subText}>Serviços e produtos produzidos</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Vendas de produtos e serviços')} style={styles.button}>
                        <Ionicons name="fast-food-outline" color="a1a1a1" size={30} style={styles.icon} />
                        <Text style={styles.text}>Vendas de produtos e serviços</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Vendas a prazo')} style={styles.button}>
                        <Ionicons name="time-outline" color="a1a1a1" size={30} style={styles.icon} />
                        <Text style={styles.text}>Vendas a prazo</Text>
                    </TouchableOpacity> 
                </View>
            </SafeAreaView>
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.subContainer}>
                <Text style={styles.subText}>Revenda de produtos</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Estoque')} style={styles.button}>
                        <Ionicons name="file-tray-full-outline" color="a1a1a1" size={30} style={styles.icon} />
                        <Text style={styles.text}>Estoque</Text>
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
        paddingTop: 20,
    },
    icon: {
        paddingLeft: 0,
        color: "#5C5C5C"
    },
    text: {
        color: "black",
        paddingLeft: 15,
        fontWeight: '300',
        fontSize: 16,
        width: '85%',
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
    subContainer: {
        marginBottom: 30,
    },
});