import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet, 
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Select from "../Components";
import { firebase } from "../../../../config";
import { categorias } from "../Components/categorias";

const AlterarCustoFixo = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const initialState = {
    id: "",
    categoria: "",
    descricao: "",
    valor: "",
    dataUltimaAlteracao:date + " às " + time,
  };

  const [campos, setCampos] = useState(initialState);
  const [carregar, setCarregar] = useState(true);

  const handleChangeText = (value, prop) => {
    setCampos({ ...campos, [prop]: value });
  };

  const pegarDadosID = async (id) => {
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custo fixo').doc(id);
    const doc = await dbRef.get();
    const campos = doc.data();
    setCampos({ ...campos, id: doc.id });
    setCarregar(false);
  };

  const deletarDados = async () => {
    setCarregar(true)
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custo fixo')
      //.collection("custo fixo")
      .doc(props.route.params.camposId);
    await dbRef.delete();
    setCarregar(false)
    props.navigation.navigate("Custo fixo");
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
    const camposRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('custo fixo').doc(campos.id);
    await camposRef.set({
      categoria: campos.categoria,
      descricao: campos.descricao,
      valor: campos.valor,
      dataUltimaAlteracao: date + " às " + time,
      dataAdicao: campos.dataAdicao,
    });
    setCampos(initialState);
    props.navigation.navigate("Custo fixo");
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
      <Text style={styles.text}>Tipo de custo fixo:</Text>
      <Select 
          options={categorias} 
          onChangeSelect={(id)=> handleChangeText(id, "categoria")} 
          text={campos.categoria}
          label="Categoria: (label)"
          value={campos.categoria}         
          />
      </View>
      <Text style={styles.text}>Descreva esse custo fixo:</Text>
      <View style={styles.input}>
        <TextInput
          autoCompleteType="Descricao"
          placeholder="Descrição                                               "
          style={styles.inputGroup}
          value={campos.descricao}
          onChangeText={(value) => handleChangeText(value, "descricao")}
        />
      </View>
      <Text style={styles.text}>Gastos com esse custo fixo:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Valor                                               "
          autoCompleteType="valor"
          style={styles.inputGroup}
          keyboardType="decimal-pad"
          value={campos.valor}
          onChangeText={(value) => handleChangeText(value, "valor")}
        />
      </View>
      <View style={styles.btn}>
        <Button title="Atualizar" onPress={() => atualizarDados()} color="#5CC6BA" style={styles.btnStl}/>
      </View>
      <View style={styles.btnDel}>
        <Button
          title="Deletar"
          onPress={() => openConfirmationAlert()}
          color="#FF7368"
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

export default AlterarCustoFixo;