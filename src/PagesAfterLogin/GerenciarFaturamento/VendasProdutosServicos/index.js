import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { firebase } from "../../../config";

const VendasProdutosServicos = (props) => {
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('produtos e serviços').onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, descricao, quantidadeUnitaria, custoUnitario, vendaUnitaria } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          descricao,
          quantidadeUnitaria,
          custoUnitario,
          vendaUnitaria
        });
      });
      setCampos(campos);
    });
  }, []); 


  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("Cadastrar vendas de produtos e serviços")}
        title="Cadastrar dados"
      />
      {campos.map((campos) => {
        return (
          <ListItem
            key={campos.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Alterar vendas de produtos e serviços", {
                camposId: campos.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{campos.categoria}</ListItem.Title>
              <ListItem.Subtitle>{campos.descricao}</ListItem.Subtitle>
              <ListItem.Subtitle>{campos.quantidadeUnitaria}</ListItem.Subtitle>
              <ListItem.Subtitle>{"R$ "+campos.custoUnitario}</ListItem.Subtitle>
              <ListItem.Subtitle>{"R$ "+campos.vendaUnitaria}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default VendasProdutosServicos;