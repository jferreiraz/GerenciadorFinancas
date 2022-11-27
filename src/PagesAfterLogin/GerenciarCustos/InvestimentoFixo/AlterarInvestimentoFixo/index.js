import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { firebase } from "../../../../config";
import Select from "../Components";
import { categorias } from "../Components/categorias";








const AlterarInvestimentoFixo = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const [isEditable, setisEditable] = useState(false);

  const checkUpdateState = () => {
    if(campos.descricao != ""){
    setisEditable(!isEditable);
    } else {
    setisEditable(isEditable);
    }
  }

  const updateState = () => {
    setisEditable(!isEditable);
  }

  const initialState = {
    id: "",
    categoria: "",
    descricao: "",
    valor: "",
    dataUltimaAlteracao:date + " às " + time,
    desgasteTaxaAnual:"",
    desgasteVidaUtil:"",
    custoDesgaste:"",
  };

  const [campos, setCampos] = useState(initialState);
  const [carregar, setCarregar] = useState(true);

  const handleTextChange = (value, prop) => {
    setCampos({ ...campos, [prop]: value });
  };

  const pegarDadosID = async (id) => {
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('investimento fixo').doc(id);
    const doc = await dbRef.get();
    const campos = doc.data();
    setCampos({ ...campos, id: doc.id });
    setCarregar(false);
  };

  const deletarDados = async () => {
    setCarregar(true)
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('investimento fixo')
      //.collection("investimento fixo")
      .doc(props.route.params.camposId);
    await dbRef.delete();
    setCarregar(false)
    props.navigation.navigate("Investimento fixo");
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
    const result = categorias.find( element => element.name === campos.categoria );  //Para alterar categoria
    const custoDesgaste = campos.valor/(result.vidaUtil * 12);                       //Para alterar categoria
    const camposRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('investimento fixo').doc(campos.id);
    await camposRef.set({
      categoria: campos.categoria,
      descricao: campos.descricao,
      valor: campos.valor,
      dataUltimaAlteracao: date + " às " + time,
      dataAdicao: campos.dataAdicao,
      desgasteTaxaAnual: result.taxaAnual,
      desgasteVidaUtil: result.vidaUtil,
      custoDesgaste: custoDesgaste,
    });
    setCampos(initialState);
    props.navigation.navigate("Investimento fixo");
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
      <SafeAreaView style={styles.inputGroup}>
      <Select 
          options={categorias} 
          onChangeSelect={(value)=> handleTextChange(value, "categoria")} 
          text={campos.categoria}
          label="Categoria:"
          value={campos.categoria}
          placeholder={campos.categoria}         
          />
      </SafeAreaView>
      <View>
        <TextInput
          placeholder="Valor"
          autoCompleteType="valor"
          style={styles.inputGroup}
          value={campos.valor}
          keyboardType="decimal-pad"
          onChangeText={(value) => handleTextChange(value, "valor")}
        />
      </View>
      <Button
        onPress={updateState}
        title={isEditable ? "Clique para desabilitar descrição" : "Clique para habilitar descrição"}>
      </Button>
      <View style={styles.container}>
        <TextInput
          autoCompleteType="Descricao"
          placeholder={isEditable ? 'Descrição' : 'Desabilitado'}
          style={styles.inputGroup}
          value={campos.descricao}
          onChangeText={(value) => handleTextChange(value, "descricao")}
          editable={isEditable}
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

export default AlterarInvestimentoFixo;










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
