import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
} from "react-native";

import { firebase } from "../../../../config";
import Select from "../Components";
import { SafeAreaView } from "react-native";
import { categorias } from "../Components/categorias";

import { doc, setDoc } from "firebase/firestore";
import { dbacess } from "../../../../config";
import { collection, query, getDocs } from "firebase/firestore";

const CadastrarEstoque = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const today = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const initalState = {
    categoria: "",
    descricao: "",
    quantidade: "",
    custo: "",
    valor: "",
    lucro: "",
    dataAdicao: date + " às " + time,
    dataUltimaAlteracao: date + " às " + time,
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, categoria) => {
    setState({ ...state, [categoria]: value });
  };

  const salvarNovo = async () => {
    const token = state.categoria + " - " + today + "." + currentMonth + "." + currentYear + "(" + time + ")";

    const q = query(collection(dbacess, "usuarios"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    console.log(queryData);
    queryData.map(async (v) => {
      await setDoc(doc(dbacess, `usuarios/${firebase.auth().currentUser.uid}/estoque`, token), {
        categoria: state.categoria,
        descricao: state.descricao,
        quantidade: state.quantidade,
        custo: state.custo,
        valor: state.valor,
        lucro: state.valor*state.quantidade-state.custo,
        dataAdicao: state.dataAdicao,
        dataUltimaAlteracao: state.dataUltimaAlteracao,
      });
      props.navigation.navigate("Estoque");
    })
  };

  return (
    <ScrollView style={styles.container}>
      {/* categoria Input */}
      <SafeAreaView style={styles.inputGroup}>
      <Text style={styles.text}>Categoria de quantidade:</Text>
        <Select
          options={categorias}
          onChangeSelect={(value) => handleChangeText(value, "categoria")}
          text="Selecione uma categoria"
          value={state.categoria}
        />
      </SafeAreaView>

      {/* descricao Input */}
      <Text style={styles.text}>Produto adquirido:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Nome do produto                                              "
          numberOfLines={1}
          onChangeText={(value) => handleChangeText(value, "descricao")}
          value={state.descricao}
        />
      </View>

      {/* Input */}
      <Text style={styles.text}>Quantidade unitária adquirida:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Quantidade unitária                                              "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "quantidade")}
          value={state.quantidade}
        />
      </View>
      {/* Input */}
      <Text style={styles.text}>Gasto total da compra:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Custo de compra                                              "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "custo")}
          value={state.custo}
        />
      </View>
      {/* Input */}
      <Text style={styles.text}>Custo de venda unitário:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Valor de venda                                              "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "valor")}
          value={state.valor}
        />
      </View>

      <View style={styles.button}>
        <Button title="Salvar Dados" color="#5CC6BA" onPress={() => salvarNovo()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    paddingTop: 15,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 5,
    borderBottomColor: "#cccccc",
    marginTop: 5,
  },
  input: {
    textAlign: 'center',
    height: 60,
    borderWidth: 0.5,
    marginBottom: 20,
    fontSize: 20,
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 10,
    marginHorizontal: 0,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text:{
    fontWeight: '300',
    fontSize: 16,
    paddingBottom: 5,
  },
  button: {
    paddingBottom: 80,
  }
});

export default CadastrarEstoque;