import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { categorias } from './categorias';
import { Ionicons } from '@expo/vector-icons'

const Select = ({ options, text, onChangeSelect, label }) => {
    const [txt, setTxt] = useState(text);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState('');
    function renderOption(item) {
        return (
            (<TouchableOpacity style={[styles.optionContainer, { backgroundColor: item.id == selected ? '#eee' : '#fff' }]}
                onPress={() => {
                    onChangeSelect(item.id);
                    setTxt(item.name);
                    setModalVisible(false);
                    setSelected(item.id);
                }}>
                <Ionicons name={item.logo} color="a1a1a1" size={25} style={styles.icon} />
                <Text style={styles.optionTxt}>{item.name}</Text>
                {item.id == selected}
            </TouchableOpacity>)
        )
    }

    return (
        <>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                <Text style={styles.textButtom} numberOfLines={1}>
                    {txt}
                </Text>
            </TouchableOpacity>

            <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>

                <View style={styles.headerModal}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Ionicons name="arrow-back-outline" color="a1a1a1" size={25} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{text}</Text>
                </View>
                <FlatList
                    data={options}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => renderOption(item)}
                />

            </Modal>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        height: 60,
        borderWidth: 0.5,
        marginTop: 10,
        marginBottom: 10,
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
    textButtom: {
        color: '#555',
        fontSize: 18,

    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 12,
        paddingRight: 18,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingTop: 15,
    },
    modalTitle: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
        paddingLeft: 20,
    },
    modalCancel: {
        fontSize: 14,
        color: '#5CC6BA',
        fontWeight: '600',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
    },
    optionTxt: {
        fontSize: 16,
        color: '#555',
        paddingLeft: 10,
    },
    label: {
        fontSize: 14,
        color: '#737373',
        paddingBottom: 5,
    },
    icon: {
        paddingLeft: 5,
    }

})
export default Select;