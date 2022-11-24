import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { collection, query, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

//import firebase from "../../../config";
import { firebase } from "../../../config";

const CustoFixo = (props) => {
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custo fixo').onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, descricao, valor, dataHoje } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          descricao,
          valor,
          dataHoje
        });
      }); 
      setCampos(campos); 
    });
  }, []); 


  return (
    <ScrollView backgroundColor="white">
      <Button
        onPress={() => props.navigation.navigate("Cadastrar custo fixo")}
        title="Cadastrar dados"
        style={styles.button}>
        <Text style={styles.title}>CADASTRAR DADOS</Text>
      </Button>

      {campos.map((campos) => {
        return (
          <ListItem
            key={campos.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Alterar custo fixo", {
                camposId: campos.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{campos.categoria}</ListItem.Title>
              <ListItem.Subtitle>{"Descrição: "+campos.descricao}</ListItem.Subtitle>
              <ListItem.Subtitle>{"Custo: R$ "+campos.valor}</ListItem.Subtitle>
              <ListItem.Subtitle>{"Registro em: "+campos.dataHoje}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default CustoFixo;

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
      fontSize: 15,
      fontWeight: "500",
      color: "white",

  },
  subTitle: {
      fontSize: 16,
      fontWeight: "400",
      color: "300022",
      paddingTop: 12,
      paddingBottom: 20,
      paddingHorizontal: 6
  },
  button: {
      alignSelf: "center",
      borderRadius: 5,
      backgroundColor: "blue",
      margin: 10,
      padding: 10,
      width: 300,
      alignItems: 'center',
      fontSize: '22',
      color: 'white',
  },
  inputArea:{
      flexDirection: 'row',
      width: '100%',
      paddingTop: 20,
  },
  icon:{
      paddingLeft: 20,
  }
});
