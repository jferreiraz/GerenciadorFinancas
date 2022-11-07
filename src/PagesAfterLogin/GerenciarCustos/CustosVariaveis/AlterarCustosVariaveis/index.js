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
import Select from "../../../../components/select";
import firebase from "../../../../config";
import { categorias } from "../../../../components/categorias";

const AlterarCustosVariaveis = (props) => {
  const initialState = {
    id: "",
    categoria: "",
    descricao: "",
    valor: "",
  };

  const [campos, setCampos] = useState(initialState);
  const [carregar, setCarregar] = useState(true);

  const handleChangeText = (value, prop) => {
    setCampos({ ...campos, [prop]: value });
  };

  const pegarDadosID = async (id) => {
    const dbRef = firebase.db.collection("custos variaveis").doc(id);
    const doc = await dbRef.get();
    const campos = doc.data();
    setCampos({ ...campos, id: doc.id });
    setCarregar(false);
  };

  const deletarDados = async () => {
    setCarregar(true)
    const dbRef = firebase.db
      .collection("custos variaveis")
      .doc(props.route.params.camposId);
    await dbRef.delete();
    setCarregar(false)
    props.navigation.navigate("Custos variáveis");
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
    const camposRef = firebase.db.collection("custos variaveis").doc(campos.id);
    await camposRef.set({
      categoria: campos.categoria,
      descricao: campos.descricao,
      valor: campos.valor,
    });
    setCampos(initialState);
    props.navigation.navigate("Custos variáveis");
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
          text="Selecione uma categoria"
          label=""
          value={campos.categoria}         
          />
      </View>
      <View>
        <TextInput
          autoCompleteType="Descricao"
          placeholder="descricao"
          style={styles.inputGroup}
          value={campos.descricao}
          onChangeText={(value) => handleChangeText(value, "descricao")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Valor"
          autoCompleteType="valor"
          style={styles.inputGroup}
          value={campos.valor}
          onChangeText={(value) => handleChangeText(value, "valor")}
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



export default AlterarCustosVariaveis;