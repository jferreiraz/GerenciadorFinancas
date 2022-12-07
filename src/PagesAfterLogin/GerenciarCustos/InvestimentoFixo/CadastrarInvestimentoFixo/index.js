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



const CadastrarInvestimentoFixo = (props) => {
  const [isEditable, setisEditable] = useState(false);

  const updateState = () => {
    setisEditable(!isEditable);
  }

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const today = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const initalState = {
    categoria: "",
    descricao: "",
    descricaoDefault: "Item investimento fixo",
    valor: "",
    dataAdicao: date + " às " + time,
    dataUltimaAlteracao: date + " às " + time,
    desgasteTaxaAnual: "",
    desgasteVidaUtil: "",
    custoDesgaste: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, categoria) => {
    setState({ ...state, [categoria]: value });
  };

  const validation = () => {
    if (state.descricao == "") {
      return "Item investimento fixo"
    } else {
      return state.descricao
    }
  }

  const salvarNovo = async () => {
    if (state.categoria == "") {
      Alert.alert("Alerta", "Selecione uma categoria para continuar")
    } else if (state.valor == "") {
      Alert.alert("Alerta", "Preencha o valor do seu investimento fixo para continuar")
    } else {
      const result = categorias.find(element => element.name === state.categoria);
      const token = "Registro - " + today + "." + currentMonth + "." + currentYear + "(" + time + ")";
      const custoDesgaste = state.valor / (result.vidaUtil * 12);

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
          descricao: isEditable ? validation() : state.descricaoDefault,
          valor: state.valor,
          dataAdicao: state.dataAdicao,
          dataUltimaAlteracao: state.dataUltimaAlteracao,
          desgasteTaxaAnual: result.taxaAnual,
          desgasteVidaUtil: result.vidaUtil,
          custoDesgaste: custoDesgaste,
        });
        props.navigation.navigate("Investimento fixo");
      })
    };
  }








  return (

    <ScrollView style={styles.container}>
      {/* categoria Input */}
      <SafeAreaView style={styles.inputGroup}>
        <Text style={styles.text}>Categoria desse investimento:</Text>
        <Select
          options={categorias}
          onChangeSelect={(value) => { handleChangeText(value, "categoria") }}
          text="Selecione uma categoria"
          label="Categoria:"
          value={state.categoria}
        />
      </SafeAreaView>

      {/* Input */}
      <Text style={styles.text}>Gastos com esse investimento:</Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Valor                                              "
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChangeText(value, "valor")}
          value={state.valor}
        />
      </View>

      <Text style={styles.text}>Descrição desse item:</Text>
      <Button
        onPress={updateState}
        color="#5CC6BA"
        title={isEditable ? "Desabilitar descrição" : "Habilitar descrição"}>
      </Button>

      {/* descricao Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={isEditable ? 'Descrição                                              ' : 'Desabilitado'}
          numberOfLines={1}
          onChangeText={(value) => handleChangeText(value, "descricao")}
          value={isEditable ? state.descricao : state.descricaoDefault}
          editable={isEditable}
          underlineColorAndroid="transparent"
          style={[
            styles.textInputStyle,
            {
              borderColor: isEditable ? 'black' : 'red',
              backgroundColor: isEditable ? '#F8F9FA' : '#E1E1E1'
            }
          ]}
        />
      </View>

      <View style={styles.button}>
        <Button title="Salvar Dados" color="#5CC6BA" onPress={() => salvarNovo()} />
      </View>
    </ScrollView>


  );
};


export default CadastrarInvestimentoFixo;











const styles = StyleSheet.create({
  textInputStyle: {
    height: 60,
    borderWidth: 0.5,
    marginTop: 0,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 12,
    borderRadius: 5,
    backgroundColor: '#F8F9FA'
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 15,
    borderBottomColor: "#cccccc",
    marginTop: 0,
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