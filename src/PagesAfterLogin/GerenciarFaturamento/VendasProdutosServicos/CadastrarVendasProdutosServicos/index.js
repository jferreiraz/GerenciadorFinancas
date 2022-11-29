import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import { firebase } from "../../../../config";
import Select from "../Components";
import { SafeAreaView } from "react-native";
import { categorias } from "../Components/categorias";

import { doc, setDoc } from "firebase/firestore";
import { dbacess } from "../../../../config";
import { collection, query, getDocs } from "firebase/firestore";

const CadastrarVendasProdutosServicos = (props) => {
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
    dataAdicao:date + " às " + time,
    dataUltimaAlteracao:date + " às " + time,
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, categoria) => {
    setState({ ...state, [categoria]: value });
  };

  const salvarNovo = async () => {
    const token = state.categoria+" - "+today+"."+currentMonth+"."+currentYear+"("+ time+")";

    const q = query(collection(dbacess, "usuarios"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
    }));
    console.log(queryData);
    queryData.map(async (v) => {
      await setDoc(doc(dbacess, `usuarios/${firebase.auth().currentUser.uid}/produtos e serviços`, token), {
          categoria: state.categoria, 
          descricao: state.descricao,
          quantidadeUnitaria: state.quantidadeUnitaria,
          custoUnitario: state.custoUnitario,
          custoGeral: state.custoGeral,
          vendaUnitaria: state.vendaUnitaria,
          vendaGeral: state.vendaGeral,
          lucroUnitario: state.lucroUnitario,
          lucroGeral: state.lucroGeral,
          dataAdicao: state.dataAdicao,
          dataUltimaAlteracao: state.dataUltimaAlteracao,
        });
        props.navigation.navigate("Vendas de produtos e serviços");
    })
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
          placeholder="Quantidade unitária do produto"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "quantidadeUnitaria")}
          value={state.quantidadeUnitaria}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Custo de produção unitário"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "custoUnitario")}
          value={state.custoUnitario}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Custo de venda unitário"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "vendaUnitaria")}
          value={state.vendaUnitaria}
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

export default CadastrarVendasProdutosServicos;