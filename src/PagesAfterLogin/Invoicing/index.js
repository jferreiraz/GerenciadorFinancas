import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'



const K_OPTIONS = [
  {
    item: 'Mão de obra',
    id: 'Mo',
  },
  {
    item: 'Custo fixo',
    id: 'Cf',
  },
  {
    item: 'Custos variaveis',
    id: 'Cv',
  }
]

export default function Detail() {
  const [selectedTeam, setSelectedTeam] = useState({})
  return (
    <View style={{ margin: 30 }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>Gerenciador</Text>
      </View>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Navegar</Text>
      <SelectBox
        label="Gerenciar custos"
        options={K_OPTIONS}
        hideInputFilter='true'
        inputPlaceholder='Gerenciar'
        value={selectedTeam}
      />
        <TouchableOpacity style={styles.button1} onPress={()=> Alert.alert('Confirmação','Tem certeza que deseja encerrar sessão?',[{text:'Sim', onPress: () => {console.log('Yes Pressed');}},{text:'Não', onPress: () => {console.log('Yes Pressed');}}])  }><Text style={styles.text}>Encerrar sessão</Text></TouchableOpacity>

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
    text:{
        color: "#FFF",
        fontSize: 15,

    }
});
