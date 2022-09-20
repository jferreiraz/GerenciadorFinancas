import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Welcome from '../Pages/Welcome'
import SignIn from '../Pages/SignIn'
import Register from '../Pages/Register'
import ForgetPassword from '../Pages/ForgetPassword'
import Home from '../PagesAfterLogin/Home'

const Stack = createNativeStackNavigator();

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
            component={Home}
            options={{ headerShown:false }}
        />
    </Stack.Navigator>
    )
}

