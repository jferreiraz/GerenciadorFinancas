import React, { useState, useEffect } from "react";
import { Button, StyleSheet, TouchableScale } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { firebase } from "../../../config";

const CustosVariaveis = (props) => {
  const [campos, setCampos] = useState([]);
  const arrTotalCV = []
  var totalCV = 0;

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custos variáveis').onSnapshot((querySnapshot) => {
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
    arrTotalCV.push(parseFloat(element.valor));
  });

  for (var i = 0; i < arrTotalCV.length; i++) {
    totalCV += parseFloat(arrTotalCV[i]);
  }

  return (
    <ScrollView>
      <ListItem
        Component={TouchableScale}
        friction={100}
        tension={120}
        activeScale={0.92}
        key={campos.id}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Subtitle style={styles.subTitle}>{"Total gasto com custos variáveis: R$" + totalCV}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Campos adicionados: " + campos.length}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Button
        onPress={() => props.navigation.navigate("Cadastrar custos variáveis")}
        title="Cadastrar dados"
        color="#5CC6DD"
      />
      {campos.map((campos) => {
        return (
          <ListItem
            key={campos.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Alterar custos variáveis", {
                camposId: campos.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{campos.categoria}</ListItem.Title>
              <ListItem.Subtitle style={styles.subTitle}>{"Descrição: " + campos.descricao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Valor: R$" + campos.valor}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Adicionado em: " + campos.dataAdicao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Última alteração: " + campos.dataUltimaAlteracao}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default CustosVariaveis;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    paddingBottom: 4,
    fontSize: 18,
  },
  subTitle: {
    paddingBottom: 1,
    color: 'black',
    fontSize: 14,
  },
  subTitleDate: {
    paddingLeft: 5,
    paddingBottom: 1,
    fontSize: 14,
    fontStyle: 'italic',
  }
});