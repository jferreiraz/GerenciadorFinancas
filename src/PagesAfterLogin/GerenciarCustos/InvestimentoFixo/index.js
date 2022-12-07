import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import TouchableScale from 'react-native-touchable-scale';

import { firebase } from "../../../config";
import categorias from "./Components/categorias";

const InvestimentoFixo = (props) => {
  const [campos, setCampos] = useState([]);
  const arrTotalIF = []
  const arrManutencaoIF = []
  var totalIF = 0;
  var manutencaoIF = 0;

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('investimento fixo').onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, descricao, valor, dataAdicao, dataUltimaAlteracao, desgasteTaxaAnual, desgasteVidaUtil, custoDesgaste } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          descricao,
          valor,
          dataAdicao,
          dataUltimaAlteracao,
          desgasteTaxaAnual,
          desgasteVidaUtil,
          custoDesgaste,
        });
      });
      setCampos(campos);
    });
  }, []);

  campos.forEach((element) => {
    arrTotalIF.push(parseFloat(element.valor));
    arrManutencaoIF.push(parseFloat(element.custoDesgaste));
  });

  for (var i = 0; i < arrTotalIF.length; i++) {
    totalIF += parseFloat(arrTotalIF[i]);
    manutencaoIF += parseFloat(arrManutencaoIF[i]);
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
          <ListItem.Subtitle style={styles.subTitle}>{"Total em investimento fixo: R$" + totalIF}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Custo de manutenção geral: R$" + manutencaoIF.toFixed(2)}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Campos adicionados: " + campos.length}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Button
        onPress={() => props.navigation.navigate("Cadastrar investimento fixo")}
        title="Cadastrar dados"
        color="#5CC6DD"
      />
      {campos.map((campos) => {
        //----------------------
        var numeros = [] 
        numeros.push(campos.valor)
        console.log(numeros)

        var soma = 0;
        for (var i = 0; i < numeros.length; i++) {
          soma += numeros[i];
        }
        console.log(soma)
        //---------------------------------

        return (
          <ListItem
            Component={TouchableScale}
            friction={100}
            tension={120}
            activeScale={0.92}
            key={campos.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Alterar investimento fixo", {
                camposId: campos.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{campos.categoria}</ListItem.Title>
              <ListItem.Subtitle style={styles.subTitle}>{"Descrição: " + campos.descricao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Custo: R$" + campos.valor}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Adicionado em: " + campos.dataAdicao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Última alteração: " + campos.dataUltimaAlteracao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDesgaste}>{"Desgasta " + campos.desgasteTaxaAnual + "% durante " + campos.desgasteVidaUtil + " anos, custo de reparo anual: R$" + campos.custoDesgaste}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default InvestimentoFixo;

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
  },
  subTitleDesgaste: {
    paddingLeft: 5,
    paddingBottom: 1,
    fontSize: 14,
    color: "#596E85",
    fontStyle: 'italic',
  }
});