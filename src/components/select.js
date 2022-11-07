import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import {useState} from 'react';
import { categorias } from './categorias';

const Select = ({options, text, onChangeSelect, label}) => {
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

    return (
     <>
        <Text style={styles.label}>{label}</Text>

        <TouchableOpacity style={styles.container} onPress={()=> setModalVisible(true)}>
            <Text style={styles.textButtom} numberOfLines={1}>
                {txt}
            </Text>
        </TouchableOpacity>
       
        <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
             
             <View style={styles.headerModal}>
                <TouchableOpacity onPress={()=> setModalVisible(false)}>
                    <Text>Voltar</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>{text}</Text>

                <TouchableOpacity onPress={()=> setModalVisible(false)}>
                    <Text style={styles.modalCancel}>Cancelar</Text>
                </TouchableOpacity>
            </View>
             
             <FlatList 
                data={options}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => renderOption(item)}
             />
        </Modal>
    </>
    );   
};


const styles = StyleSheet.create({
    container:{
        height: 40,
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 10,
        marginHorizontal: 0,
        borderRadius: 5,
        fontSize: 18,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textButtom:{
        color: '#555',
        fontSize:18,
        
    },
    headerModal:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingBottom: 12,
        paddingTop: 8,
    },
    modalTitle:{
        fontSize: 18,
        color: '#555',
    },
    modalCancel:{
        fontSize: 14,
        color: '#5CC6BA',
        fontWeight: '600',
    },
    optionContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding:10,
    },
    optionTxt:{
        fontSize: 16,
        color: '#555',
    },
    label:{
        fontSize:14,
        color: '#737373',
        paddingBottom:5,
        
        
    }

})
export default Select;