import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import {useState} from 'react';
import { categorias } from './categorias';



const encerrarAlerta = ({navigation}) => {
    const [txt, setTxt] = useState(text);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState('');
    function renderOption(item){
        return (
            (<TouchableOpacity style={[styles.optionContainer,{backgroundColor:item.id == selected ? '#eee':'#fff'}]}
                onPress={()=>{
                onChangeSelect(item.id);
                setTxt(item.name);
                setModalVisible(false);
                setSelected(item.id);
            }}>
                <Text style={styles.optionTxt}>{item.name}</Text>
                {item.id == selected}
            </TouchableOpacity>)
        )
    }
    function nv(){
        navigation.navigate('SignIn')
    }
    //const nv = navigation.navigate('SignIn')
    const nt = console.log('Yes Pressed')  
};

export default encerrarAlerta;