import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Welcome from        '../PagesLogin/Welcome'
import SignIn from         '../PagesLogin/SignIn'
import Register from       '../PagesLogin/Register'
import ForgetPassword from '../PagesLogin/ForgetPassword'

import Home from        "../PagesAfterLogin/Home";
import Detail from      "../PagesAfterLogin/Detail";
import Information from "../PagesAfterLogin/Information";
import Profile from     "../PagesAfterLogin/Profile";
import Settings from    "../PagesAfterLogin/Settings";
import DRE from         "../PagesAfterLogin/DRE";
import Invoicing from   "../PagesAfterLogin/Invoicing";
import Financas from    "../PagesAfterLogin/Financas";

import GerenciarCustos from  "../PagesAfterLogin/GerenciarCustos";
import InvestimentoFixo from "../PagesAfterLogin/GerenciarCustos/InvestimentoFixo";
import CustoFixo from        "../PagesAfterLogin/GerenciarCustos/CustoFixo";
import MaoDeObra from        "../PagesAfterLogin/GerenciarCustos/MaoDeObra";
import CustosVariaveis from  "../PagesAfterLogin/GerenciarCustos/CustosVariaveis";

import CadastrarInvestimentoFixo from "../PagesAfterLogin/GerenciarCustos/InvestimentoFixo/CadastrarInvestimentoFixo";
import CadastrarCustoFixo from        "../PagesAfterLogin/GerenciarCustos/CustoFixo/CadastrarCustoFixo";
import CadastrarMaoDeObra from        "../PagesAfterLogin/GerenciarCustos/MaoDeObra/CadastrarMaoDeObra";
import CadastrarCustosVariaveis from  "../PagesAfterLogin/GerenciarCustos/CustosVariaveis/CadastrarCustosVariaveis";

import GerenciarFaturamento from   "../PagesAfterLogin/GerenciarFaturamento";
import Estoque from                "../PagesAfterLogin/GerenciarFaturamento/Estoque";
import VendasPrazo from            "../PagesAfterLogin/GerenciarFaturamento/VendasPrazo";
import VendasProdutosServicos from "../PagesAfterLogin/GerenciarFaturamento/VendasProdutosServicos";

import CadastrarEstoque from                "../PagesAfterLogin/GerenciarFaturamento/Estoque/CadastrarEstoque";
import CadastrarVendasPrazo from            "../PagesAfterLogin/GerenciarFaturamento/VendasPrazo/CadastrarVendasPrazo";
import CadastrarVendasProdutosServicos from "../PagesAfterLogin/GerenciarFaturamento/VendasProdutosServicos/CadastrarVendasProdutosServicos";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes({navigation}){
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
            options={{title: 'Gerenciador de Finanças', headerBackVisible:false ,headerStyle: {backgroundColor: '#5CC6BA'}, headerTintColor:'#101010', headerRight: () => (
              <TouchableOpacity onPress={()=> alert('Settings') }><Feather name="settings" size={24} color="black" /></TouchableOpacity>
            )}}
        />
        <Stack.Screen //--------------------------------------------------- PÁGINAS GERENCIAR CUSTOS ------------------------------------------------------
            name="Gerenciar Custos" 
            component={GerenciarCustos} 
        />
        <Stack.Screen 
            name="Investimento fixo" 
            component={InvestimentoFixo} 
        />
        <Stack.Screen 
            name="Cadastrar investimento fixo" 
            component={CadastrarInvestimentoFixo} 
        />
        <Stack.Screen  
            name="Custo fixo" 
            component={CustoFixo} 
        />
        <Stack.Screen 
            name="Cadastrar custo fixo" 
            component={CadastrarCustoFixo} 
        />
        <Stack.Screen 
            name="Custos com mão de obra" 
            component={MaoDeObra} 
        />
        <Stack.Screen 
            name="Cadastrar mão de obra" 
            component={CadastrarMaoDeObra} 
        />
        <Stack.Screen 
            name="Custos variáveis" 
            component={CustosVariaveis} 
        />
        <Stack.Screen 
            name="Cadastrar custos variáveis" 
            component={CadastrarCustosVariaveis} 
        />
        <Stack.Screen //--------------------------------------------------- PÁGINAS GERENCIAR FATURAMENTO ------------------------------------------------------
            name="Gerenciar Faturamento" 
            component={GerenciarFaturamento} 
        />
        <Stack.Screen 
            name="Estoque" 
            component={Estoque} 
        />
        <Stack.Screen 
            name="Cadastrar estoque" 
            component={CadastrarEstoque} 
        />
        <Stack.Screen 
            name="Vendas a prazo" 
            component={VendasPrazo} 
        />
        <Stack.Screen 
            name="Cadastrar vendas a prazo" 
            component={CadastrarVendasPrazo} 
        />
        <Stack.Screen 
            name="Vendas de produtos e serviços" 
            component={VendasProdutosServicos} 
        />
        <Stack.Screen 
            name="Cadastrar vendas de produtos e serviços" 
            component={CadastrarVendasProdutosServicos} 
        />
        <Stack.Screen //--------------------------------------------------- OUTRAS PÁGINAS ------------------------------------------------------
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


        <Stack.Screen //--------------------------------------------------- PÁGINAS NÃO FUNCIONAIS ------------------------------------------------------
            name="Finanças" 
            component={Financas} 
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