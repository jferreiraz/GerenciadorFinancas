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
      <Text style={styles.text}>Selecione a forma de contratação:</Text>
      <Select 
          options={categorias} 
          onChangeSelect={(value)=> handleChangeText(value, "categoria")} 
          text="Selecione uma categoria"
          label="Categoria:"
          value={state.categoria}         
          />
      </SafeAreaView>

      {/* funcao Input */}
      <Text style={styles.text}>Descreva o cargo do funcionário:</Text>
      <View style={styles.input}>
        <TextInput 
          placeholder="Descrição (Opcional)                                              "
          numberOfLines={1}
          onChangeText={(value) => handleChangeText(value, "funcao")}
          value={state.funcao}
        />
      </View>

      {/* Input */}
      <Text style={styles.text}>Quantos funcionários nesse cargo:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Quantidade com essa função                                              "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "numeroFuncionarios")}
          value={state.numeroFuncionarios}
        />
      </View>
      
      {/* Input */}
      <Text style={styles.text}>Salário dessa função:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Salário                                              "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "salario")}
          value={state.salario}
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
  },
  inputGroup: {
    flex: 1,
    marginBottom: 15,
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
  }
});

export default CadastrarMaoDeObra;