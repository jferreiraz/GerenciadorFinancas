import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Welcome from '../PagesLogin/Welcome'
import SignIn from '../PagesLogin/SignIn'
import Register from '../PagesLogin/Register'
import ForgetPassword from '../PagesLogin/ForgetPassword'

import Home from "../PagesAfterLogin/Home";
import Detail from "../PagesAfterLogin/Detail";
import Financas from "../PagesAfterLogin/Financas";
import Information from "../PagesAfterLogin/Information";
import Profile from "../PagesAfterLogin/Profile";
import Settings from "../PagesAfterLogin/Settings";
import DRE from "../PagesAfterLogin/DRE";
import Invoicing from "../PagesAfterLogin/Invoicing";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes({navigation}){
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
            options={{title: 'Gerenciador de Finanças', headerBackVisible:false ,headerStyle: {backgroundColor: '#5CC6BA'}, headerTintColor:'#101010', headerRight: () => (
              <TouchableOpacity onPress={()=> alert('Settings') }><Feather name="settings" size={24} color="black" /></TouchableOpacity>
            )}}
        />
        <Stack.Screen 
            name="Finanças" 
            component={Financas} 
        />
        <Stack.Screen 
            name="Profile" 
            component={Profile} 
        />
        <Stack.Screen 
            name="Settings" 
            component={Settings} 
        />
        <Stack.Screen 
            name="DRE" 
            component={DRE} 
        />
        <Stack.Screen 
            name="Faturamento" 
            component={Invoicing} 
        />
    </Stack.Navigator>
    )
}

function Tabs(){
  return(
    <Tab.Navigator initialRouteName="Principal">
      <Tab.Screen 
        name="Informação" 
        component={Information}
        options={{
          headerShown: false,
          tabBarIcon:({ color, size }) => (
            <MaterialCommunityIcons name="help-box" color={color} size={size} />), 
        }}
      />
      <Tab.Screen 
        name="Principal" 
        component={Home}
        options={{ 
          headerShown:false, 
          tabBarIcon:({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />), 
        }}
      />
      <Tab.Screen 
        name="Encerrar sessão" 
        component={Detail}
        options={{
        tabBarIcon:({ color, size }) => (
          <MaterialCommunityIcons name="exit-to-app" color={color} size={size} />), 
      }}
      />
    </Tab.Navigator>
  )
}