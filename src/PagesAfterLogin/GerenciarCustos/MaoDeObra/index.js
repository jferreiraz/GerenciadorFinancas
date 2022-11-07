import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../../config";

const CustoFixo = (props) => {
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    firebase.db.collection("custo fixo").onSnapshot((querySnapshot) => {
      const campos = [];
      querySnapshot.docs.forEach((doc) => {
        const { categoria, descricao, valor } = doc.data();
        campos.push({
          id: doc.id,
          categoria,
          descricao,
          valor,
        });
      });
      setCampos(campos);
    });
  }, []); 


  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("Cadastrar custo fixo")}
        title="Cadastrar dados"
      />
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
              <ListItem.Subtitle>{campos.descricao}</ListItem.Subtitle>
              <ListItem.Subtitle>{"R$ "+campos.valor}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default CustoFixo;