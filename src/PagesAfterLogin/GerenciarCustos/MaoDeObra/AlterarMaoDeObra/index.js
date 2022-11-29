import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Select from "../Components";
import { firebase } from "../../../../config";
import { categorias } from "../Components/categorias";

const AlterarMaoDeObra = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const initialState = {
    id: "",
    categoria: "",
    funcao: "",
    gastosFuncao: "",
    numeroFuncionarios: "",
    salario: "",
    dataUltimaAlteracao:date + " às " + time,
  };

  const [campos, setCampos] = useState(initialState);
  const [carregar, setCarregar] = useState(true);

  const handleChangeText = (value, prop) => {
    setCampos({ ...campos, [prop]: value });
  };

  const pegarDadosID = async (id) => {
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('mão de obra').doc(id);
    const doc = await dbRef.get();
    const campos = doc.data();
    setCampos({ ...campos, id: doc.id });
    setCarregar(false);
  };

  const deletarDados = async () => {
    setCarregar(true)
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('mão de obra')
      //.collection("mao de obra")
      .doc(props.route.params.camposId);
    await dbRef.delete();
    setCarregar(false)
    props.navigation.navigate("Custos com mão de obra");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Deletar dados",
      "Você tem certeza que deseja remover os dados digitados?",
      [
        { text: "Sim", onPress: () => deletarDados() },
        { text: "Não", onPress: () => console.log("Cancelado") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const atualizarDados = async () => {
    const totalGastosFuncao = campos.numeroFuncionarios * campos.salario;
    const camposRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('mão de obra').doc(campos.id);
    await camposRef.set({
      categoria: campos.categoria,
      funcao: campos.funcao,
      numeroFuncionarios: campos.numeroFuncionarios,
      gastosFuncao: totalGastosFuncao,
      salario: campos.salario,
      dataUltimaAlteracao: date + " às " + time,
      dataAdicao: campos.dataAdicao,
    });
    setCampos(initialState);
    props.navigation.navigate("Custos com mão de obra");
  };

  useEffect(() => {
    pegarDadosID(props.route.params.camposId);
  }, []);

  if (carregar) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
      <Select 
          options={categorias} 
          onChangeSelect={(id)=> handleChangeText(id, "categoria")} 
          text={campos.categoria} 
          label=""
          value={campos.categoria}     
          />
      </View>
      <View>
        <TextInput
          autoCompleteType="funcao"
          placeholder="Função"
          style={styles.inputGroup}
          value={campos.funcao}
          onChangeText={(value) => handleChangeText(value, "funcao")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="numeroFuncionarios"
          placeholder="Número de funcionários"
          style={styles.inputGroup}
          value={campos.numeroFuncionarios}
          onChangeText={(value) => handleChangeText(value, "numeroFuncionarios")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Salário"
          autoCompleteType="salario"
          style={styles.inputGroup}
          value={campos.salario}
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "salario")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Deletar"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Atualizar" onPress={() => atualizarDados()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default AlterarMaoDeObra;