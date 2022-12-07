import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { collection, query, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import TouchableScale from 'react-native-touchable-scale';

//import firebase from "../../../config";
import { firebase } from "../../../config";

const CustoFixo = (props) => {
  const [campos, setCampos] = useState([]);
  const arrTotalCF = []
  var totalCF = 0;

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custo fixo').onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, descricao, valor, dataAdicao, dataUltimaAlteracao } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          descricao,
          valor,
          dataAdicao,
          dataUltimaAlteracao,
        });
      });
      setCampos(campos);
    });
  }, []);

  campos.forEach((element) => {
    arrTotalCF.push(parseFloat(element.valor));
  });

  for (var i = 0; i < arrTotalCF.length; i++) {
    totalCF += parseFloat(arrTotalCF[i]);
  }


  return (

    <ScrollView backgroundColor="white">
      <ListItem
        Component={TouchableScale}
        friction={100}
        tension={120}
        activeScale={0.92}
        key={campos.id}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Subtitle style={styles.subTitle}>{"Total em custo fixo: R$" + totalCF}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Campos adicionados: " + campos.length}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Button
        onPress={() => props.navigation.navigate("Cadastrar custo fixo")}
        title="Cadastrar dados"
        style={styles.button}
        color="#5CC6DD">
        <Text style={styles.buttonTitle}>CADASTRAR DADOS</Text>
      </Button>

      {campos.map((campos) => {
        return (
          <ListItem
            Component={TouchableScale}
            friction={100}
            tension={120}
            activeScale={0.92}
            key={campos.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Alterar custo fixo", {
                camposId: campos.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{campos.categoria}</ListItem.Title>
              <ListItem.Subtitle style={styles.subTitle}>{"Descrição: " + campos.descricao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Custo: R$ " + campos.valor}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Adicionado em: " + campos.dataAdicao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Última alteração: " + campos.dataUltimaAlteracao}</ListItem.Subtitle>
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
  buttonTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "black",
    paddingBottom: 1,
  },
  subTitleDate: {
    paddingLeft: 5,
    paddingBottom: 1,
    fontSize: 14,
    fontStyle: 'italic',
  },
  subTitleDesgaste: {
    paddingLeft: 5,
    paddingBottom: 1,
    fontSize: 14,
    color: "#596E85",
    fontStyle: 'italic',
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
  inputArea: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 20,
  },
  icon: {
    paddingLeft: 20,
  }
});
