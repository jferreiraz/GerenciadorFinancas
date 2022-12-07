import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Text
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
    if (campos.descricao != "") {
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
    descricaoDefault: "Item investimento fixo",
    valor: "",
    dataUltimaAlteracao: date + " às " + time,
    desgasteTaxaAnual: "",
    desgasteVidaUtil: "",
    custoDesgaste: "",
  };

  const [campos, setCampos] = useState(initialState);
  const [carregar, setCarregar] = useState(true);

  const handleTextChange = (value, prop) => {
    setCampos({ ...campos, [prop]: value });
  };

  const validation = () => {
    if (campos.descricao == "") {
      return "Item investimento fixo"
    } else {
      return campos.descricao
    }
  }

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
    if (campos.categoria == "") {
      Alert.alert("Alerta", "Selecione uma categoria para continuar")
    } else if (campos.valor == "") {
      Alert.alert("Alerta", "Preencha o valor do seu investimento fixo para continuar")
    } else {
      const result = categorias.find(element => element.name === campos.categoria);  //Para alterar categoria
      const custoDesgaste = campos.valor / (result.vidaUtil * 12);                       //Para alterar categoria
      const camposRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser.uid).collection('investimento fixo').doc(campos.id);
      await camposRef.set({
        categoria: campos.categoria,
        descricao: isEditable ? validation() : validation(),
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
  }

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
        <Text style={styles.text}>Gastos com esse investimento:</Text>
        <Select
          options={categorias}
          onChangeSelect={(value) => handleTextChange(value, "categoria")}
          text={campos.categoria}
          label="Categoria:"
          value={campos.categoria}
          placeholder={campos.categoria}
        />
      </SafeAreaView>
      <Text style={styles.text}>Gastos com esse investimento:</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Valor                                              "
          autoCompleteType="valor"
          style={styles.inputGroup}
          value={campos.valor}
          keyboardType="decimal-pad"
          onChangeText={(value) => handleTextChange(value, "valor")}
        />
      </View>
      <Text style={styles.text}>Gastos com esse investimento:</Text>
      <Button
        onPress={updateState}
        color="#5CC6BA"
        title={isEditable ? "Desabilitar descrição" : "Habilitar descrição"}>
      </Button>
      <View style={styles.inputGroup}>
        <TextInput
          autoCompleteType="Descricao"
          placeholder={isEditable ? 'Descrição                                              ' : 'Desabilitado'}

          value={isEditable ? campos.descricao : campos.descricaoDefault}
          onChangeText={(value) => handleTextChange(value, "descricao")}
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

export default AlterarInvestimentoFixo;










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
    paddingHorizontal: 45,
    width: '100%',
  },
  btnStl: {
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
  text: {
    fontWeight: '300',
    fontSize: 16,
    paddingBottom: 5,
  },
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
});
