import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'

export default function Detail({ route }){
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Detalhes investimento</Text>
            <Text> </Text>
            <Text style={styles.subTitle}>Apenas pagina de texto com exibição de detalhes, lorem ipsum </Text>
        </View>
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
    text:{
        color: "#FFF",
        fontSize: 15,

    }
});
