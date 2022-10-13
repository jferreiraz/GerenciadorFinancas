import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Platform, Button } from 'react-native'

import { db } from '../../../../config'

export default function CadastrarCustoFixo(){
    //Iniciar o bd
    const [userDoc,setUserDoc] = useState(null)

    //Texto de atualização do bd
    const [text, setText, textName] = useState("")

    //CRUD do banco de dados
    const Create = () =>{
        //Criação do documento
        const myDoc = doc(db, "M2222n", "M222222")

        const docData = {
            "name": "i22222222ine",
            "bio": "yout2222222sber"
        }

        setDoc(myDoc, docData)
        .then(() => {
         alert("Documento criado")
        })
        .catch((error) => {
        //Falha na execução
         alert(error.message)
        })
    }

    const Read = () => {
        //Leitura do documento
        const myDoc = doc(db, "MyCollection", "MyDocument")

        getDoc(myDoc)
        .then((snapshot) => {
            if (snapshot.exists) {
                setUserDoc(snapshot.data())
            }
            else {
                alert("Nenhum documento foi encontrado")
            }
           })
           .catch((error) => {
            //Falha na execução
            alert(error.message)
            })
    }

    const Update = (value,merge) => {
        const myDoc = doc(db,"MyCollection","MyDocument")

        setDoc(myDoc, value, { merge: merge })
        .then(() => {
            alert("Documento atualizado")
            setText("")
           })
           .catch((error) => {
           //Falha na execução
            alert(error.message)
           })
    }

    const Delete = () => {
        const myDoc = doc(db,"MyCollection","MyDocument")

        deleteDoc(myDoc)
        .then(() => {
            alert("Documento deletado")
           })
        .catch((error) => {
            //Falha na execução
             alert(error.message)
            })
    }
  
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <TextInput placeholder='Categoria do produto...' style={styles.input} onChangeText={(text) => { setText(text) }} value={text}></TextInput>
            <TextInput placeholder='Descrição do produto...' style={styles.input} onChangeText={(textName) => { setText(textName) }} value={textName}></TextInput>
            <TextInput placeholder='Valor do produto...'     style={styles.input} onChangeText={(text) => { setText(text) }} value={text}></TextInput>

            <Button title='Create New Doc' onPress={Create}></Button>
            {
                userDoc != null &&
                <Text>Bio: {userDoc.bio}</Text> &&
                <Text>Name: {userDoc.name}</Text>
            }
            <Button title='Update the Doc' onPress={() => {
                Update({"bio": text}, true)}} disabled={text == ""}>
            </Button>
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
    button: {
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
    texts:{
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
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
});
