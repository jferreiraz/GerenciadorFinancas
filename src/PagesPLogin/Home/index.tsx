import { View, Text, StyleSheet, SafeAreaView, Platform, Button } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function Home({navigation}){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Gerenciador Finanças</Text>
                <Text></Text>
                <Text style={styles.subTitle}>Texo principal para o gerencimanto de finanças, informações principais e necessárias</Text>
                <Text></Text>
                <Text>Opções principais abaixo</Text>
                <Text> </Text>
                <View style={styles.butt}>
                    <View style={styles.butt2}>
                        <View>
                            <Button title="Finanças" onPress={()=> navigation.navigate('Finanças',{nome: 'João'})}/>
                            <Text> </Text>
                            <Button title="Informações" onPress={()=> navigation.navigate('Information',{nome: 'João'})}/>
                        </View>
                        <View style={styles.butt4}>
                            <Text style={styles.title}> Finanças</Text>
                            <Text> </Text>
                            <Text style={styles.title}> Informações</Text>
                        </View>
                    </View>
                    <View style={styles.butt3}>

                    </View>
                </View>
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
    butt: {
        padding: 5,
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: "#0022",
        width: 370,
        height: 470,
    },
    butt2: {
        flexDirection: "row",
        alignSelf: "flex-start",
        padding: 20,
    },
    butt3: {
        padding: 20,
        backgroundColor: "#1212",
        alignSelf: "center",
        width: 350,
        height: 245,
        borderRadius: 5,
    },
    butt4: {
        paddingLeft: 20,
        paddingVertical: 5,
        fontSize: 34,
        fontWeight: "400",
        color: "300022",
    },
});