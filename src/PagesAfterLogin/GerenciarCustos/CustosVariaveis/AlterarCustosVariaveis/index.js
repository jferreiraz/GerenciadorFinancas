import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Select from "../Components/index";
import { firebase } from "../../../../config";
import { categorias } from "../Components/categorias";

const AlterarCustosVariaveis = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const initialState = {
    id: "",
    categoria: "",
    descricao: "",
    valor: "",
    dataAdicao: "",
    dataUltimaAlteracao: "",
  };

  const [campos, setCampos] = useState(initialState);
  const [carregar, setCarregar] = useState(true);

  const handleChangeText = (value, prop) => {
    setCampos({ ...campos, [prop]: value });
  };

  const pegarDadosID = async (id) => {
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custos variáveis').doc(id);
    const doc = await dbRef.get();
    const campos = doc.data();
    setCampos({ ...campos, id: doc.id });
    setCarregar(false);
  };

  const deletarDados = async () => {
    setCarregar(true)
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custos variáveis')
      //.collection("custos variáveis")
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
    const camposRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custos variáveis').doc(campos.id);
    await camposRef.set({
      categoria: campos.categoria,
      descricao: campos.descricao,
      valor: campos.valor,
      dataAdicao: campos.dataAdicao,
      dataUltimaAlteracao: date + " às " + time,
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
      <Text style={styles.text}>Selecione qual o tipo de custo:</Text>
      <Select 
          options={categorias} 
          onChangeSelect={(id)=> handleChangeText(id, "categoria")} 
          text={campos.categoria}
          label=""
          value={campos.categoria}         
          />
      </View>
      <Text style={styles.text}>Descreva esse custo:</Text>
      <View style={styles.input}>
        <TextInput
          autoCompleteType="Descricao"
          placeholder="Descrição                                               "
          style={styles.inputGroup}
          value={campos.descricao}
          onChangeText={(value) => handleChangeText(value, "descricao")}
        />
      </View>
      <Text style={styles.text}>Valor desse custo variável:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Custo                                              "
          autoCompleteType="valor"
          style={styles.inputGroup}
          value={campos.valor}
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "valor")}
        />
      </View>
      <View>
        <Button title="Atualizar" onPress={() => atualizarDados()} color="#5CC6BA" />
      </View>
      <View style={styles.btn}>
        <Button
          title="Deletar"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
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
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    marginBottom: 15,
    borderBottomColor: "#cccccc",
    marginTop: 5,
    color: 'gray',
    fontSize: 16,
  },
  btn: {
    marginBottom: 7,
    marginTop: 10,
    paddingHorizontal: 30,
    width: '100%',
  },
  btnStl:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnDel: {
    width: '100%',
    align: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  input: {
    textAlign: 'center',
    height: 60,
    borderWidth: 0.5,
    marginBottom: 15,
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

export default AlterarCustosVariaveis;