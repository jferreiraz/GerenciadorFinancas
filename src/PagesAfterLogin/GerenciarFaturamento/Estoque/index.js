import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Estoque({ navigation }){
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Pagina Estoque</Text>
            <Text></Text>
            <Text style={styles.subTitle}>Apenas pagina de texto com exibição de informações, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Cadastrar estoque',{nome: 'João'})} style={styles.button}><Text>Cadastrar estoque</Text></TouchableOpacity>
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
    },
    button: {
        padding: 10,
        margin: 50,
        alignItems: 'center',
        backgroundColor: "blue",
        borderRadius: 10,
        width: 250,
        justifyContent: 'center'        
    },
});