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

const CadastrarMaoDeObra = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const today = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; 

  const initalState = {
    categoria: "",
    funcao: "",
    numeroFuncionarios: "",
    salario: "",
    gastosFuncao: "",
    dataAdicao:date + " às " + time,
    dataUltimaAlteracao:date + " às " + time,
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, categoria) => {
    setState({ ...state, [categoria]: value });
  };

  const salvarNovo = async () => {
    const token = state.categoria+" - "+today+"."+currentMonth+"."+currentYear+"("+ time+")";
    const totalGastosFuncao = state.numeroFuncionarios * state.salario;

    const q = query(collection(dbacess, "usuarios"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
    }));
    console.log(queryData);
    queryData.map(async (v) => {
      await setDoc(doc(dbacess, `usuarios/${firebase.auth().currentUser.uid}/mão de obra`, token), {
          categoria: state.categoria, 
          funcao: state.funcao,
          numeroFuncionarios: state.numeroFuncionarios,
          salario: state.salario,
          gastosFuncao: totalGastosFuncao,
          dataAdicao: state.dataAdicao,
          dataUltimaAlteracao: state.dataUltimaAlteracao,
        });
        props.navigation.navigate("Custos com mão de obra");
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

      {/* funcao Input */}
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Descrição"
          multiline={true}
          numberOfLines={1}
          onChangeText={(value) => handleChangeText(value, "funcao")}
          value={state.funcao}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Quantidade com essa função"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "numeroFuncionarios")}
          value={state.numeroFuncionarios}
        />
      </View>
      
      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Salário"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "salario")}
          value={state.salario}
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

export default CadastrarMaoDeObra;