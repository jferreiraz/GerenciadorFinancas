import { View, StyleSheet, Text, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";


export default function Information({ route }){
    return (
        <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Página de informações</Text>
            <Text></Text>
            <View style={styles.subContainer}>
            <Text style={styles.subTitle}>Sobre</Text>
            <Text></Text>
            <Text style={styles.text}>Aplicação desenvolvida com o intuito de auxiliar a gestão financeira do seu comércio, ou até mesmo, vida pessoal. Com um maior controle e organização dos gastos buscamos elevar a rentabilidade otimizando o planejamento e o investimento de fomra correta.</Text>
            </View>
            <View style={styles.subContainer}>
            <Text style={styles.subTitle}>Segurança de dados</Text>
            <Text></Text>
            <Text style={styles.text}>O projeto foi desenvolvido utilizando o banco do google firebase, ele é responsável por armazenar todos os dados registrados dos nossos usuários, assim como autenticar os mesmos com a segurança de uma tecnologia de ponta.</Text>
            </View>
            <View style={styles.subContainer}>
            <Text style={styles.subTitle}>Suporte</Text>
            <Text></Text>
            <Text style={styles.text}>Para mais informações, correções e sugestões entre em contato com a equipe de suporte do aplicativo.</Text>
            </View>
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    headerContainer: {
        padding: 20,
        paddingTop: Platform.OS == 'android' ? 30 : 0
    },
    subContainer: {
        backgroundColor: "#FFF",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "400",
        color: "344422",
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "400",
        color: "##414141",
        fontWeight: '600'
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        color: "gray",
    }
});