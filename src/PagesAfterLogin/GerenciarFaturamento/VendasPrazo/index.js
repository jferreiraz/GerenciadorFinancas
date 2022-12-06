import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { firebase } from "../../../config";

const VendasPrazo = (props) => {
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('vendas prazo').onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, descricao, quantidadeUnitaria, custoUnitario, custoGeral, vendaUnitaria, vendaGeral, lucroUnitario, lucroGeral, dataAdicao, dataUltimaAlteracao } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          descricao,
          quantidadeUnitaria,
          custoUnitario,
          custoGeral,
          vendaUnitaria,
          vendaGeral,
          lucroUnitario,
          lucroGeral,
          dataAdicao,
          dataUltimaAlteracao
        });
      });
      setCampos(campos);
    });
  }, []); 


  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("Cadastrar vendas a prazo")}
        title="Cadastrar dados"
        color="#5CC6DD"
      />
      {campos.map((campos) => {
        return (
          <ListItem
            key={campos.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Alterar vendas a prazo", {
                camposId: campos.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{campos.categoria}</ListItem.Title>
              <ListItem.Subtitle style={styles.subTitle}>{"Descrição: "+campos.descricao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Quantidade produzida: " + campos.quantidadeUnitaria}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Custo de produção unitária: R$" + campos.custoUnitario}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Custo de produção geral: R$" + campos.custoGeral}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Valor de venda unitária: R$" + campos.vendaUnitaria}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Valor de venda geral: R$" + campos.vendaGeral}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Lucro líquido unitário: R$" + campos.lucroUnitario}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Lucro líquido estimado: R$" + campos.lucroGeral}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Adicionado em: "+campos.dataAdicao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Última alteração: "+campos.dataUltimaAlteracao}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default VendasPrazo;

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