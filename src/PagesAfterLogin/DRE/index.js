import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native'

export default function Detail(props) {
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, paddingVertical: 20 }}>DRE</Text>
      </View>
      <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>A página DRE está em desenvolvimento, aguarde novas atualizações para mais funcionalidades!</Text>
      </View>
      <TouchableOpacity style={styles.button1}
        onPress={() => Alert.alert('Notificação', 'Voltar para a tela principal', [
          { text: 'OK', onPress: () => { props.navigation.navigate("Home") } },
          ])}>
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button1: {
    padding: 10,
    margin: 50,
    alignItems: 'center',
    backgroundColor: "blue",
    borderRadius: 10,
    width: 250,
    justifyContent: 'center'
  },
  text: {
    color: "#FFF",
    fontSize: 15,
  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  }
});
