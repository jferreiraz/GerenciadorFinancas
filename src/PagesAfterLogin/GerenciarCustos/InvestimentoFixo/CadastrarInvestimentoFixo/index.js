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





const CadastrarInvestimentoFixo = (props) => {
  const [isEditable, setisEditable] = useState(false);

  const updateState = () => {
    setisEditable(!isEditable);
  }

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const initalState = {
    categoria: "",
    descricao: "",
    valor: "",
    dataHoje:date + " às " + time,
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, categoria) => {
    setState({ ...state, [categoria]: value });
  };

  const salvarNovo = async () => {
    const token = state.descricao+" - "+time;

    const q = query(collection(dbacess, "usuarios"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
    }));
    console.log(queryData);
    queryData.map(async (v) => {
      await setDoc(doc(dbacess, `usuarios/${firebase.auth().currentUser.uid}/investimento fixo`, token), {
          categoria: state.categoria, 
          descricao: state.descricao,
          valor: state.valor,
          dataHoje: state.dataHoje,
        });
        props.navigation.navigate("Investimento fixo");
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

      <Button
        onPress={updateState}
        title={isEditable ? "Clique para desabilitar descrição" : "Clique para habilitar descrição"}>
      </Button>

      {/* descricao Input */}
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder={isEditable ? 'Descrição' : 'Desabilitado'}
          multiline={true}
          numberOfLines={1}
          onChangeText={(value) => handleChangeText(value, "descricao")}
          value={state.descricao}
          editable={isEditable}
          underlineColorAndroid="transparent"
          style={[
            styles.textInputStyle,
            {
              borderColor: isEditable ? 'black' : 'red',
              backgroundColor: isEditable ? 'white' : '#d7d7d7'
            }
          ]}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textInputStyle} 
          placeholder="Valor"
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "valor")}
          value={state.valor}
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
  textInputStyle: {
    height: 60,
    borderWidth: 0.5,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    paddingLeft: 12,
  }
});

export default CadastrarInvestimentoFixo;