import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import TouchableScale from 'react-native-touchable-scale';

import { firebase } from "../../../config";

const Estoque = (props) => {
  const [campos, setCampos] = useState([]);
  const arrTotal = []
  const arrLucroLiquido = []
  const arrLucroBruto = []
  var totalE = 0;
  var lucroLiquido = 0;
  var lucroBruto = 0;

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('estoque').onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, descricao, quantidadeUnitaria, custoUnitario, custoGeral, vendaUnitaria, vendaGeral, lucroUnitario, lucroGeral, dataAdicao, dataUltimaAlteracao } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          descricao,
          quantidadeUnitaria,
          custoUnitario,
          custoGeral,//calculo
          vendaUnitaria,
          vendaGeral,//calculo
          lucroUnitario,//calculo
          lucroGeral,//calculo
          dataAdicao,
          dataUltimaAlteracao,
        });
      });
      setCampos(campos);
    });
  }, []); 

  campos.forEach((element) => {
    arrTotal.push(parseFloat(element.custoGeral));
    arrLucroBruto.push(parseFloat(element.vendaGeral));
    arrLucroLiquido.push(parseFloat(element.lucroGeral));
  });

  for (var i = 0; i < arrTotal.length; i++) {
    totalE += parseFloat(arrTotal[i]);
    lucroBruto += parseFloat(arrLucroBruto[i]);
    lucroLiquido += parseFloat(arrLucroLiquido[i]);
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
          <ListItem.Subtitle style={styles.subTitle}>{"Custo total estimado: R$" + totalE.toFixed(2)}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Lucro líquido estimado: R$" + lucroLiquido.toFixed(2)}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Lucro bruto estimado: R$" + lucroBruto.toFixed(2)}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Campos adicionados: " + campos.length}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Button
        onPress={() => props.navigation.navigate("Cadastrar estoque")}
        title="Cadastrar dados"
        color="#5CC6DD"
      />
      {campos.map((campos) => {
        return (
          <ListItem
            key={campos.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Alterar estoque", {
                camposId: campos.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{campos.descricao}</ListItem.Title>
              <ListItem.Subtitle style={styles.subTitle}>{campos.categoria}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Quantidade produzida: " + campos.quantidadeUnitaria}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Custo de produção unitária: R$" + parseFloat(campos.custoUnitario).toFixed(2)}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Lucro líquido unitário: R$" + campos.lucroUnitario.toFixed(2)}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Valor de venda unitária: R$" + parseFloat(campos.vendaUnitaria).toFixed(2)}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Custo de produção geral: R$" + campos.custoGeral.toFixed(2)}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Lucro líquido estimado: R$" + campos.lucroGeral.toFixed(2)}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Valor de venda geral: R$" + campos.vendaGeral.toFixed(2)}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Adicionado em: "+campos.dataAdicao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Última alteração: "+campos.dataUltimaAlteracao}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default Estoque;

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