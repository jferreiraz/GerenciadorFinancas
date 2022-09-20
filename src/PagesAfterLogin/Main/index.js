import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from "../Home";
import DetailScreen from "../Detail";
import FinancasScreen from "../Financas";
import InformationScreen from "../Information";
import InformationScreen2 from "../Information";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Principal" component={HomeScreen}/>
      <Tab.Screen name="Detail" component={DetailScreen}/>
      <Tab.Screen name="Information" component={InformationScreen}/>
    </Tab.Navigator>
  )
}

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Tabs} options={{title: 'Gerenciador completo de Finanças', headerStyle: {backgroundColor: '#3333'}, headerTintColor:'#101010',}}/>
        <Stack.Screen name="Finanças" component={FinancasScreen} />
        <Stack.Screen name="Informações2" component={InformationScreen2} />
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
