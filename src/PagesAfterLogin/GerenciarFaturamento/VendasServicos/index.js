import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Financas({ route }){
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text>Finanças</Text>
            <Text>A variavel nome recebida como objeto direto da página home, ao clicar no botão detail é: {route.params.nome} </Text>
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
        fontSize: 24,
        fontWeight: "400",
        color: "344422",
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "300022",
    }
});