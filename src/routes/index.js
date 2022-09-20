import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Welcome from '../Pages/Welcome'
import SignIn from '../Pages/SignIn'
import Register from '../Pages/Register'
import ForgetPassword from '../Pages/ForgetPassword'

import HomeScreen from "../PagesAfterLogin/Home";
import DetailScreen from "../PagesAfterLogin/Detail";
import FinancasScreen from "../PagesAfterLogin/Financas";
import InformationScreen from "../PagesAfterLogin/Information";
import InformationScreen2 from "../PagesAfterLogin/Information";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes(){
return(
    <Stack.Navigator>
        <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown:false }}
        />
        <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown:false }}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown:false }}
        />
        <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown:false }}
        />
        <Stack.Screen 
            name="Home" 
            component={Tabs} 
            options={{title: 'Gerenciador completo de Finanças', headerStyle: {backgroundColor: '#3333'}, headerTintColor:'#101010',}}
        />
        <Stack.Screen 
            name="Finanças" 
            component={FinancasScreen} 
        />
        <Stack.Screen 
            name="Informações2" 
            component={InformationScreen2} 
        />
    </Stack.Navigator>
    )
}

function Tabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen 
        name="Principal" 
        component={HomeScreen}
      />
      <Tab.Screen 
        name="Detail" 
        component={DetailScreen}
      />
      <Tab.Screen 
        name="Information" 
        component={InformationScreen}
      />
    </Tab.Navigator>
  )
}