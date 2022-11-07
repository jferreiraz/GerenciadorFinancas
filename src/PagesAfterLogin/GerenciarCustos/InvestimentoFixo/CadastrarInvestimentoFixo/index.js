import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../../../../config";
import Select from "../Components";
import { SafeAreaView } from "react-native";
import { categorias } from "../Components/categorias";

const CadastrarInvestimentoFixo = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const initalState = {
    categoria: "",
    descricao: "",
    valor: "",
    dataHoje:date + " às " + time,
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, categoria) => {
    setState({ ...state, [categoria]: value });
  };

  const salvarNovo = async () => {
    if (state.categoria === "") {
      alert("Porfavor preencha todos os campos");
    } else {

      try {
        await firebase.db.collection("investimento fixo").add({
          categoria: state.categoria,
          descricao: state.descricao,
          valor: state.valor,
          dataHoje: state.dataHoje,
        });

        props.navigation.navigate("Investimento fixo");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* categoria Input */}
      <SafeAreaView style={styles.inputGroup}>
      <Select 
          options={categorias} 
          onChangeSelect={(value)=> handleChangeText(value, "categoria")} 
          text="Selecione uma categoria"
          label="Categoria:"
          value={state.categoria}         
          />
      </SafeAreaView>

      {/* descricao Input */}
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Descrição"
          multiline={true}
          numberOfLines={1}
          onChangeText={(value) => handleChangeText(value, "descricao")}
          value={state.descricao}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Valor"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "valor")}
          value={state.valor}
        />
      </View>

      <View style={styles.button}>
        <Button title="Salvar Dados" onPress={() => salvarNovo()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CadastrarInvestimentoFixo;