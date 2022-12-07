import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Alert,
} from "react-native";

import { firebase } from "../../../../config";
import Select from "../Components";
import { SafeAreaView } from "react-native";
import { categorias } from "../Components/categorias";

import { doc, setDoc } from "firebase/firestore";
import { dbacess } from "../../../../config";
import { collection, query, getDocs } from "firebase/firestore";

const CadastrarVendasPrazo = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const today = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const initalState = {
    categoria: "",
    descricao: "",
    quantidadeUnitaria: "",
    custoUnitario: "",
    custoGeral: "",
    vendaUnitaria: "",
    vendaGeral: "",
    lucroUnitario: "",
    lucroGeral: "",
    dataAdicao: date + " às " + time,
    dataUltimaAlteracao: date + " às " + time,
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, categoria) => {
    setState({ ...state, [categoria]: value });
  };

  const salvarNovo = async () => {
    if (state.categoria == "") {
      Alert.alert("Alerta", "Selecione uma categoria para continuar")
    } else if (state.descricao == "") {
      Alert.alert("Alerta", "Descreva qual é o item para continuar")
    } else if (state.quantidadeUnitaria == "") {
      Alert.alert("Alerta", "Preencha a quantidade unitária para continuar")
    } else if (state.custoUnitario == "") {
      Alert.alert("Alerta", "Preencha o custo de produção para continuar")
    } else if (state.vendaUnitaria == "") {
      Alert.alert("Alerta", "Preencha o valor de venda para continuar")
    } else {
      const token = "Registro - " + today + "." + currentMonth + "." + currentYear + "(" + time + ")";

      const q = query(collection(dbacess, "usuarios"));
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));
      console.log(queryData);
      queryData.map(async (v) => {
        await setDoc(doc(dbacess, `usuarios/${firebase.auth().currentUser.uid}/vendas prazo`, token), {
          categoria: state.categoria,
          descricao: state.descricao,
          quantidadeUnitaria: state.quantidadeUnitaria,
          custoUnitario: state.custoUnitario,
          custoGeral: (state.quantidadeUnitaria * state.custoUnitario),
          vendaUnitaria: state.vendaUnitaria,
          vendaGeral: (state.quantidadeUnitaria * state.vendaUnitaria),
          lucroUnitario: (state.vendaUnitaria - state.custoUnitario),
          lucroGeral: (state.vendaUnitaria - state.custoUnitario) * state.quantidadeUnitaria,
          dataAdicao: state.dataAdicao,
          dataUltimaAlteracao: state.dataUltimaAlteracao,
        });
        props.navigation.navigate("Vendas a prazo");
      })
    };
  }

  return (
    <ScrollView style={styles.container}>
      {/* categoria Input */}
      <SafeAreaView style={styles.inputGroup}>
        <Text style={styles.text}>Categoria do item:</Text>
        <Select
          options={categorias}
          onChangeSelect={(value) => handleChangeText(value, "categoria")}
          text="Selecione uma categoria"
          value={state.categoria}
        />
      </SafeAreaView>

      {/* descricao Input */}
      <Text style={styles.text}>Descrição do item:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Descrição                                              "
          numberOfLines={1}
          onChangeText={(value) => handleChangeText(value, "descricao")}
          value={state.descricao}
        />
      </View>

      {/* Input */}
      <Text style={styles.text}>Quantidade unitária desse item:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Quantidade unitária                                              "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "quantidadeUnitaria")}
          value={state.quantidadeUnitaria}
        />
      </View>
      <Text style={styles.text}>Gastos com a produção do item:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Custo de produção unitária                                             "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "custoUnitario")}
          value={state.custoUnitario}
        />
      </View>
      <Text style={styles.text}>Custo de venda unitário:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Venda unitária                                              "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "vendaUnitaria")}
          value={state.vendaUnitaria}
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
  text: {
    fontWeight: '300',
    fontSize: 16,
    paddingBottom: 5,
  },
  button: {
    paddingBottom: 80,
  }
});

export default CadastrarVendasPrazo;