import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Platform } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'

export default function Detail({ route }){
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Finalizar abaixo</Text>
            <Text> </Text>
            <Text style={styles.subTitle}>Apenas pagina de texto com exibição de detalhes, lorem ipsum </Text>
        </View>
        <TouchableOpacity style={styles.button1} onPress={()=> Alert.alert('Confirmação','Tem certeza que deseja encerrar sessão?',[{text:'Sim', onPress: () => {console.log('Yes Pressed');}},{text:'Não', onPress: () => {console.log('Yes Pressed');}}])  }><Text style={styles.text}>Encerrar</Text></TouchableOpacity>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    button1: {
        padding: 10,
        margin: 50,
        alignItems: 'center',
        backgroundColor: "blue",
        borderRadius: 10,
        width: 250,
        justifyContent: 'center'        
    },
    container: {
        flex: 1,
        backgroundColor: "fff",
    },
    text:{
        color: "#FFF",
        fontSize: 15,

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
