import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { firebase } from "../../../config";

const Estoque = (props) => {
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('estoque').onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, descricao, quantidade, custo, valor, lucro, dataAdicao, dataUltimaAlteracao } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          descricao,
          quantidade,
          custo,
          valor,
          lucro,
          dataAdicao,
          dataUltimaAlteracao,
        });
      });
      setCampos(campos);
    });
  }, []); 


  return (
    <ScrollView>
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
              <ListItem.Subtitle style={styles.subTitle}>{"Unidades: "+campos.quantidade}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Custo de compra: R$ "+campos.custo}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Valor de venda: R$ "+campos.valor}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Lucro previsto: R$ "+campos.lucro}</ListItem.Subtitle>
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