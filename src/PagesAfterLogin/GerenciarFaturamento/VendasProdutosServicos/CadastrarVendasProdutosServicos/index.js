import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Platform, Button } from 'react-native'

import { db } from '../../../../config'

export default function CadastrarVendasProdutosServicos(){
    //Iniciar o bd
    const [userDoc,setUserDoc] = useState(null)

    //Texto de atualização do bd
    const [text,setText] = useState("")

    //CRUD do banco de dados
    const Create = () =>{
        //Criação do documento
        const myDoc = doc(db, "MyCollection", "MyDocument2")

        const docData = {
            "name": "iJustyyine",
            "bio": "youtuber"
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
            <Text style={styles.title}>Detalhes investimento fixo</Text>
            <Text> </Text>
            <Text style={styles.subTitle}>Apenas pagina de texto com exibição de detalhes, lorem ipsum </Text>
            <Button title='Create New Doc' onPress={Create}></Button>
            <Button title='Read the Doc' onPress={Read}></Button>
            {
                userDoc != null &&
                <Text>Bio: {userDoc.bio}</Text>
            }
            <TextInput placeholder='Digite aqui' onChangeText={(text) => { setText(text) }} value={text}></TextInput>
            <Button title='Update the Doc' onPress={() => {
                Update({"bio": text}, true)}} disabled={text == ""}>
                </Button>
            <Button title='Delete the Doc' onPress={Delete}></Button>
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
