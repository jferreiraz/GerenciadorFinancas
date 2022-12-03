import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native'
//import { TouchableHighlight } from "react-native-gesture-handler";


export default function Welcome () {
  const navigation= useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.img} />
      <Text style={styles.detail}>
      Organize seus gastos e seu faturamento em qualquer lugar a qualquer hora. Gere seu próprio DRE e acompanhe a evolução do seu comércio.
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.text}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5CC6BA",
  },
  img: {
    height: "20%",
    width: "50%",
    resizeMode: "contain",
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
  detail: {
    color: "#C9FCFB",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 30,
    marginTop: 30,
  },
  btn: {
    marginTop: 80,
    backgroundColor: "#5CC6BA",
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white'
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
});