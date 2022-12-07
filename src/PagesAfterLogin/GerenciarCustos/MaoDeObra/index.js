import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import TouchableScale from 'react-native-touchable-scale';

import { firebase } from "../../../config";

const MaoDeObra = (props) => {
  const [campos, setCampos] = useState([]);
  const arrTotalMO = []
  const arrFuncionariosMO = []
  var totalMO = 0;
  var funcionariosMO = 0;

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('mão de obra').onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, funcao, numeroFuncionarios, gastosFuncao, salario, dataAdicao, dataUltimaAlteracao } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          funcao,
          numeroFuncionarios,
          gastosFuncao,
          salario,
          dataAdicao,
          dataUltimaAlteracao,
        });
      });
      setCampos(campos);
    });
  }, []);

  campos.forEach((element) => {
    arrTotalMO.push(parseFloat(element.gastosFuncao));
    arrFuncionariosMO.push(parseFloat(element.numeroFuncionarios));
  });

  for (var i = 0; i < arrTotalMO.length; i++) {
    totalMO += parseFloat(arrTotalMO[i]);
    funcionariosMO += parseFloat(arrFuncionariosMO[i]);
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
          <ListItem.Subtitle style={styles.subTitle}>{"Total gasto com mão de obra: R$" + totalMO}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Quantidade de funcionários: " + funcionariosMO}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subTitle}>{"Campos adicionados: " + campos.length}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Button
        onPress={() => props.navigation.navigate("Cadastrar mão de obra")}
        title="Cadastrar dados"
        color="#5CC6DD"
      />
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
              props.navigation.navigate("Alterar mão de obra", {
                camposId: campos.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{campos.categoria}</ListItem.Title>
              <ListItem.Subtitle style={styles.subTitle}>{"Função: "+campos.funcao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Salário: R$" + campos.salario}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Quantidade de funcionários: "+ campos.numeroFuncionarios}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitle}>{"Gasto total com essa função: R$"+ campos.gastosFuncao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Adicionado em: " + campos.dataAdicao}</ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subTitleDate}>{"Última alteração: " + campos.dataUltimaAlteracao}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default MaoDeObra;

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