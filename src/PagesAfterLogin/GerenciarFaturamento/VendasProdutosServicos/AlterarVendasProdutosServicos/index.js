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
import { firebase } from "../../../../config";
import { categorias } from "../../../../components/categorias";

const AlterarVendasProdutosServicos = (props) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  
  const initialState = {
    id: "",
    categoria: "",
    descricao: "",
    quantidadeUnitaria: "",
    custoUnitario: "",
    custoGeral: "",
    vendaUnitaria: "",
    vendaGeral: "",
    lucroUnitario: "",
    lucroGeral: "",
    dataAdicao: "",
    dataUltimaAlteracao: "",
  };

  const [campos, setCampos] = useState(initialState);
  const [carregar, setCarregar] = useState(true);

  const handleChangeText = (value, prop) => {
    setCampos({ ...campos, [prop]: value });
  };

  const pegarDadosID = async (id) => {
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('produtos e serviços').doc(id);
    const doc = await dbRef.get();
    const campos = doc.data();
    setCampos({ ...campos, id: doc.id });
    setCarregar(false);
  };

  const deletarDados = async () => {
    setCarregar(true)
    const dbRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('produtos e serviços')
      //.collection("produtos e serviços")
      .doc(props.route.params.camposId);
    await dbRef.delete();
    setCarregar(false)
    props.navigation.navigate("Vendas de produtos e serviços");
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
    const camposRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('produtos e serviços').doc(campos.id);
    await camposRef.set({
      categoria: campos.categoria,
      descricao: campos.descricao,
      quantidadeUnitaria: campos.quantidadeUnitaria,
      custoUnitario: campos.custoUnitario,
      custoGeral: campos.custoGeral,
      vendaUnitaria: campos.vendaUnitaria,
      vendaGeral: campos.vendaGeral,
      lucroUnitario: campos.lucroUnitario,
      lucroGeral: campos.lucroGeral,
      dataAdicao: campos.dataAdicao,
      dataUltimaAlteracao: date + " às " + time,
    });
    setCampos(initialState);
    props.navigation.navigate("Vendas de produtos e serviços");
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
          autoCompleteType="Descricao"
          placeholder="descricao"
          style={styles.inputGroup}
          value={campos.descricao}
          onChangeText={(value) => handleChangeText(value, "descricao")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Quantidade unitária do produto"
          style={styles.inputGroup}
          value={campos.quantidadeUnitaria}
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "quantidadeUnitaria")}
        />
      </View>
      <View>
        <TextInput
          style={styles.inputGroup}
          placeholder="Custo de produção unitário"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "custoUnitario")}
          value={campos.custoUnitario}
        />
      </View>
      <View>
        <TextInput
          style={styles.inputGroup}
          placeholder="Custo de venda unitário"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "vendaUnitaria")}
          value={campos.vendaUnitaria}
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

export default AlterarVendasProdutosServicos;