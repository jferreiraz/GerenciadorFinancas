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

const CadastrarCustosVariaveis = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const today = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const initalState = {
    categoria: "",
    descricao: "",
    valor: "",
    dataAdicao: date + " às " + time,
    dataUltimaAlteracao: date + " às " + time,
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, categoria) => {
    setState({ ...state, [categoria]: value });
  };

  const validation = () => {
    if (state.descricao == "") {
      return "Item custo variável"
    } else {
      return state.descricao
    }
  }

  const salvarNovo = async () => {
    if (state.categoria == "") {
      Alert.alert("Alerta", "Selecione uma categoria para continuar")
    } else if (state.valor == "") {
      Alert.alert("Alerta", "Preencha o valor do seu custo variável para continuar")
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
        await setDoc(doc(dbacess, `usuarios/${firebase.auth().currentUser.uid}/custos variáveis`, token), {
          categoria: state.categoria,
          descricao: validation(),
          valor: state.valor,
          dataAdicao: state.dataAdicao,
          dataUltimaAlteracao: state.dataUltimaAlteracao,
        });
        props.navigation.navigate("Custos variáveis");
      })
    };
  }

  return (
    <ScrollView style={styles.container}>
      {/* categoria Input */}
      <SafeAreaView style={styles.inputGroup}>
        <Text style={styles.text}>Selecione qual o tipo de custo:</Text>
        <Select
          options={categorias}
          onChangeSelect={(value) => handleChangeText(value, "categoria")}
          text="Selecione uma categoria"
          value={state.categoria}
        />
      </SafeAreaView>

      {/* descricao Input */}
      <Text style={styles.text}>Descreva esse custo:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Descrição (Opcional)                                              "
          numberOfLines={1}
          onChangeText={(value) => handleChangeText(value, "descricao")}
          value={state.descricao}
        />
      </View>

      {/* Input */}
      <Text style={styles.text}>Valor desse custo variável:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Custo                                              "
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
  text: {
    fontWeight: '300',
    fontSize: 16,
    paddingBottom: 5,
  }
});

export default CadastrarCustosVariaveis;