import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native' /*navegação 1*/
import { Ionicons } from '@expo/vector-icons'

export default function Welcome() {
    const navigation= useNavigation(); /*navegação 2*/

    return(
        <View style={styles.container}>
                    <View style={styles.containerHelp}>
            <TouchableOpacity>
            <Ionicons name="help-circle-outline" color="a1a1a1" size={30} style={styles.icon}/>
            </TouchableOpacity> 
            </View>

            <View style={styles.containerLogo}>
                <Animatable.Image
                    delay={300} 
                    animation="flipInX"
                    source={require('../../assets/logo.png')}
                    style={{ width: '50%', height: '50%'}}
                    resizeMode="contain"
                />
            </View>
            <Animatable.View delay={800} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Monitore e organize seus gastos de qualquer lugar!</Text>
                <Text style={styles.text}>Faça o login para começar</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')} /* navegação 3*/ >           
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#5cc6ba'
    },
    containerHelp:{
        backgroundColor: '#5cc6ba',
        width: '12%',
        height: '6%'
    },
    containerLogo:{
        flex:2,
        backgroundColor: '#5CC6BA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm:{
        flex:1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },
    text:{
        color: '#a1a1a1'
    },
    button:{
        position: 'absolute',
        backgroundColor: '#5CC6BA',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    help:{
        width: '100%',
        height: '80%',
        resizeMode: 'stretch',
        marginLeft: 10
    },
    icon:{
        width: '100%',
        paddingLeft: 15,
        paddingTop: 10,
    }
})