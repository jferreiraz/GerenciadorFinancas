import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from "../config"
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import Welcome from        '../PagesLogin/Welcome'
import SignIn from         '../PagesLogin/SignIn'
import Register from       '../PagesLogin/Register'
import ForgetPassword from '../PagesLogin/ForgetPassword'

import Home from        "../PagesAfterLogin/Home";
import Configuracoes from      "../PagesAfterLogin/Configuracoes";
import Information from "../PagesAfterLogin/Information";
import Profile from     "../PagesAfterLogin/Profile";
import Settings from    "../PagesAfterLogin/Settings";
import DRE from         "../PagesAfterLogin/DRE";
import Invoicing from   "../PagesAfterLogin/Invoicing";
import Financas from    "../PagesAfterLogin/Financas";
import encerrarAlerta from "../components/encerrarAlerta";
import Teste from       "../PagesAfterLogin/GerenciarCustos/Teste";

import Courses from '../PagesAfterLogin/GerenciarCustos/MaoDeObra/CadastrarMaoDeObra';
import CreateUserScreen from "../PagesAfterLogin/GerenciarCustos/InvestimentoFixo/CadastrarInvestimentoFixo";
import UserDetailScreen from "../PagesAfterLogin/GerenciarCustos/InvestimentoFixo/AlterarInvestimentoFixo";
import UsersList from "../PagesAfterLogin/GerenciarCustos/InvestimentoFixo";

import GerenciarCustos from  "../PagesAfterLogin/GerenciarCustos";
import InvestimentoFixo from "../PagesAfterLogin/GerenciarCustos/InvestimentoFixo";
import CustoFixo from        "../PagesAfterLogin/GerenciarCustos/CustoFixo";
import MaoDeObra from        "../PagesAfterLogin/GerenciarCustos/MaoDeObra";
import CustosVariaveis from  "../PagesAfterLogin/GerenciarCustos/CustosVariaveis";

import CadastrarInvestimentoFixo from "../PagesAfterLogin/GerenciarCustos/InvestimentoFixo/CadastrarInvestimentoFixo";
import CadastrarCustoFixo from        "../PagesAfterLogin/GerenciarCustos/CustoFixo/CadastrarCustoFixo";
import CadastrarMaoDeObra from        "../PagesAfterLogin/GerenciarCustos/MaoDeObra/CadastrarMaoDeObra";
import CadastrarCustosVariaveis from  "../PagesAfterLogin/GerenciarCustos/CustosVariaveis/CadastrarCustosVariaveis";

import AlterarInvestimentoFixo from "../PagesAfterLogin/GerenciarCustos/InvestimentoFixo/AlterarInvestimentoFixo";
import AlterarCustoFixo from        "../PagesAfterLogin/GerenciarCustos/CustoFixo/AlterarCustoFixo";
import AlterarMaoDeObra from        "../PagesAfterLogin/GerenciarCustos/MaoDeObra/AlterarMaoDeObra";
import AlterarCustosVariaveis from  "../PagesAfterLogin/GerenciarCustos/CustosVariaveis/AlterarCustosVariaveis";

import GerenciarFaturamento from   "../PagesAfterLogin/GerenciarFaturamento";
import Estoque from                "../PagesAfterLogin/GerenciarFaturamento/Estoque";
import VendasPrazo from            "../PagesAfterLogin/GerenciarFaturamento/VendasPrazo";
import VendasProdutosServicos from "../PagesAfterLogin/GerenciarFaturamento/VendasProdutosServicos";

import CadastrarEstoque from                "../PagesAfterLogin/GerenciarFaturamento/Estoque/CadastrarEstoque";
import CadastrarVendasPrazo from            "../PagesAfterLogin/GerenciarFaturamento/VendasPrazo/CadastrarVendasPrazo";
import CadastrarVendasProdutosServicos from "../PagesAfterLogin/GerenciarFaturamento/VendasProdutosServicos/CadastrarVendasProdutosServicos";

import AlterarEstoque from                "../PagesAfterLogin/GerenciarFaturamento/Estoque/AlterarEstoque";
import AlterarVendasPrazo from            "../PagesAfterLogin/GerenciarFaturamento/VendasPrazo/AlterarVendasPrazo";
import AlterarVendasProdutosServicos from "../PagesAfterLogin/GerenciarFaturamento/VendasProdutosServicos/AlterarVendasProdutosServicos";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes(navigation){
return(
    <Stack.Navigator>
        <Stack.Screen //--------------------------------------------------- PÁGINAS DE LOGIN ------------------------------------------------------
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
        <Stack.Screen   //--------------------------------------------------- PÁGINA PRINCIPAL ------------------------------------------------------
            name="Home" 
            component={Tabs} 
            options={{
                title: 'Gerenciador Financeiro', headerBackVisible:false ,
                headerTitleStyle: {color: 'black', fontWeight: 'bold'},
                headerStyle: {backgroundColor: 
                    '#5CC6BA'
                    //'#FEF'
                }, 
                //headerTintColor:'#101010',
                headerShadowVisible: false,
                headerShown: false,
             }}
        />
        <Stack.Screen //--------------------------------------------------- PÁGINAS GERENCIAR CUSTOS ------------------------------------------------------
            name="Gerenciar Custos" 
            component={GerenciarCustos}
            options={{
                headerStyle: {backgroundColor: "#FEF"}
            }} 
        />
        <Stack.Screen 
            name="Investimento fixo" 
            component={InvestimentoFixo} 
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }} 
        />
        <Stack.Screen 
            name="Cadastrar investimento fixo" 
            component={CadastrarInvestimentoFixo} 
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }} 
        />
        <Stack.Screen 
            name="Alterar investimento fixo" 
            component={AlterarInvestimentoFixo} 
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }} 
        />
        <Stack.Screen  
            name="Custo fixo" 
            component={CustoFixo}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Cadastrar custo fixo" 
            component={CadastrarCustoFixo}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }} 
        />
        <Stack.Screen 
            name="Alterar custo fixo" 
            component={AlterarCustoFixo}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Custos com mão de obra" 
            component={MaoDeObra}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}   
        />
        <Stack.Screen 
            name="Cadastrar mão de obra" 
            component={CadastrarMaoDeObra}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}   
        />
        <Stack.Screen 
            name="Alterar mão de obra" 
            component={AlterarMaoDeObra}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }} 
        />
        <Stack.Screen 
            name="Custos variáveis" 
            component={CustosVariaveis} 
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }} 
        />
        <Stack.Screen 
            name="Cadastrar custos variáveis" 
            component={CadastrarCustosVariaveis} 
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }} 
        />
        <Stack.Screen 
            name="Alterar custos variáveis" 
            component={AlterarCustosVariaveis} 
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }} 
        />
        <Stack.Screen //--------------------------------------------------- PÁGINAS GERENCIAR FATURAMENTO ------------------------------------------------------
            name="Gerenciar Faturamento" 
            component={GerenciarFaturamento}
            options={{
                headerStyle: {backgroundColor: "#FEF"}
            }}  
        />
        <Stack.Screen 
            name="Estoque" 
            component={Estoque}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Cadastrar estoque" 
            component={CadastrarEstoque}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Alterar estoque" 
            component={AlterarEstoque}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Vendas a prazo" 
            component={VendasPrazo}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Cadastrar vendas a prazo" 
            component={CadastrarVendasPrazo}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Alterar vendas a prazo" 
            component={AlterarVendasPrazo}
            options={{
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Vendas de produtos e serviços" 
            component={VendasProdutosServicos}
            options={{
                headerTitle: "Produtos e serviços",
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Cadastrar vendas de produtos e serviços" 
            component={CadastrarVendasProdutosServicos}
            options={{
                headerTitle: "Cadastrar produtos e serviços",
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontSize: 17,fontWeight: '300'},
                }}  
        />
        <Stack.Screen 
            name="Alterar vendas de produtos e serviços" 
            component={AlterarVendasProdutosServicos}
            options={{
                headerTitle: "Alterar produtos e serviços",
                headerStyle: {backgroundColor: '#5CC6BA'}, 
                headerTintColor:'#EDEDED',
                headerTitleStyle: {color: '#FDF', fontSize: 19, fontWeight: '300'},
                }}  
        />
        <Stack.Screen //--------------------------------------------------- OUTRAS PÁGINAS ------------------------------------------------------
            name="Profile" 
            component={Profile}
            options={{headerShown: false}} 
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


        <Stack.Screen //--------------------------------------------------- PÁGINAS NÃO FUNCIONAIS ------------------------------------------------------
            name="Finanças" 
            component={Financas} 
        />
        <Stack.Screen 
            name="Curso" 
            component={Courses} 
        />
        <Stack.Screen
            name="UsersList"
            component={UsersList}
            options={{ title: "Users List" }}
        />
        <Stack.Screen
            name="CreateUserScreen"
            component={CreateUserScreen}
            options={{ title: "Users creation" }}
        />
        <Stack.Screen
            name="UserDetailScreen"
            component={UserDetailScreen}
            options={{ title: "Users details" }}
        />
        <Stack.Screen
            name="Teste"
            component={Teste}
        />
    </Stack.Navigator>
    )
} //------------------------------------------------------- PÁGINAS DE NAVEGAÇÃO CANTO INFERIOR----------------------------------------------------------------------------------------

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
        name="Configurações"
        component={Profile} 
        options={{
        headerShown: false,
        tabBarIcon:({ color, size }) => (
            <Feather name="settings" size={24} color="black" />), 
      }}
      />
    </Tab.Navigator>
  )
}